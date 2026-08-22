// Het wachtwoord en de API-sleutel staan NIET in deze code, maar als
// "secret" in Cloudflare zelf (Settings → Variables and Secrets):
//   WACHTWOORD  — voor het opslaan van scorers en selectie
//   HV_API_KEY  — sleutel van HollandseVelden
// Daardoor kan dit bestand veilig in de repo staan en vervang je een sleutel
// in het dashboard, zonder de code aan te raken.
const CLUB_PAD = 'z/zcfc';                      // pad op hollandsevelden.nl
const TERUGVAL = '2026-2027/west-1/za/5a';      // als het opzoeken niet lukt
const TEAM_PAGINA = 'zcfc-1-ve-zaterdag-speeldag-man';  // teampagina op zcfc.nl

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Zoekt op de clubpagina welke competitie ZCFC nú speelt. Vangt zowel de
// seizoenswissel als promotie/degradatie op, zodat de feed niet stilvalt.
// Uitkomst wordt een dag bewaard.
async function zoekCompetitiePad(env) {
  let bewaard = null;
  try { bewaard = await env.SCORERS.get('competitiepad', { type: 'json' }); } catch (e) {}
  if (bewaard && (Date.now() - bewaard.tijd) < 86400000) return bewaard.pad;

  try {
    const res = await fetch(`https://www.hollandsevelden.nl/clubs/${CLUB_PAD}/`, {
      headers: { 'Referer': 'https://www.hollandsevelden.nl/' }
    });
    const html = await res.text();
    // Eerste treffer is de eigen, actuele competitie van de club
    const m = html.match(/\/competities\/(\d{4}-\d{4}\/[a-z0-9-]+\/(?:za|zo)\/[0-9a-z]+)\//);
    if (m) {
      await env.SCORERS.put('competitiepad', JSON.stringify({ pad: m[1], tijd: Date.now() }));
      return m[1];
    }
  } catch (e) {}

  return bewaard ? bewaard.pad : TERUGVAL;
}

// ── Uitlezen van de teampagina op zcfc.nl ──
function ent(s) {
  return String(s).replace(/&#0?39;/g, "'").replace(/&amp;/g, '&')
                  .replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').trim();
}

function parseTraining(html) {
  const t = html.match(/<table[^>]*>(?:(?!<\/table>)[\s\S])*?<th>\s*Dag\s*<\/th>[\s\S]*?<\/table>/);
  if (!t) return [];
  return [...t[0].matchAll(/<tr[^>]*>\s*<td>([^<]*)<\/td>\s*<td>([^<]*)<\/td>\s*<td>([^<]*)<\/td>\s*<\/tr>/g)]
    .map(r => ({ dag: ent(r[1]), tijd: ent(r[2]), veld: ent(r[3]) }))
    .filter(r => r.dag);
}

function parseProgramma(html) {
  return [...html.matchAll(
    /<td>(\d{1,2} \w+\.?\s+\d{1,2}:\d{2})<\/td>[\s\S]{0,400}?class='[^']*\bWedstrijd\b[^']*'>([^<]+)<\/td>[\s\S]{0,400}?class='[^']*\bAccommodatie\b[^']*'>([^<]*)<\/td>/g)]
    .map(m => ({ datum: ent(m[1]), wedstrijd: ent(m[2]), accommodatie: ent(m[3]) }));
}

async function haalCompetitie(pad, apiSleutel) {
  const res = await fetch(`https://api.hollandsevelden.nl/competities/${pad}/`, {
    headers: { 'X-Api-Key': apiSleutel }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.competition?.leaguetable?.length ? data : null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    // ── GET /scorers — publiek ophalen ──
    if (url.pathname === '/scorers' && request.method === 'GET') {
      const data = await env.SCORERS.get('lijst');
      return new Response(data || '[]', {
        headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    // ── POST /scorers — opslaan met wachtwoord ──
    if (url.pathname === '/scorers' && request.method === 'POST') {
      const body = await request.json();
      if (!env.WACHTWOORD || body.password !== env.WACHTWOORD) {
        return new Response(JSON.stringify({ error: 'Ongeldig wachtwoord' }), {
          status: 401,
          headers: { ...CORS, 'Content-Type': 'application/json' }
        });
      }
      await env.SCORERS.put('lijst', JSON.stringify(body.scorers));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    // ── GET /shirt — shirt proxy ──
    if (url.pathname === '/shirt' && request.method === 'GET') {
      const file = url.searchParams.get('f');
      if (!file || !file.match(/^t_\d+\.png$/)) {
        return new Response('Not found', { status: 404 });
      }
      const img = await fetch(`https://www.hollandsevelden.nl/i/t/${file}`, {
        headers: { 'Referer': 'https://www.hollandsevelden.nl/' }
      });
      const body = await img.arrayBuffer();
      return new Response(body, {
        headers: { ...CORS, 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' }
      });
    }

    // ── GET /logo — logo proxy ──
    // HollandseVelden hernoemde de logo's naar ..._uit_<plaats>.webp. De echte
    // bestandsnaam staat op de clubpagina; die zoeken we één keer op en onthouden we.
    if (url.pathname === '/logo' && request.method === 'GET') {
      const f = url.searchParams.get('f');
      if (!f || !f.match(/^[a-z0-9-]+$/)) {
        return new Response('Not found', { status: 404 });
      }

      let map = {};
      try { map = (await env.SCORERS.get('logomap', { type: 'json' })) || {}; } catch (e) {}

      let bestand = map[f];
      if (!bestand) {
        const pagina = await fetch(`https://www.hollandsevelden.nl/clubs/${f[0]}/${f}/`, {
          headers: { 'Referer': 'https://www.hollandsevelden.nl/' }
        });
        const html = await pagina.text();
        const m = html.match(new RegExp(`club_logo_van_voetbalvereniging_${f}_uit_[a-z0-9-]+\\.webp`));
        if (!m) return new Response('Not found', { status: 404 });
        bestand = m[0];
        map[f] = bestand;
        await env.SCORERS.put('logomap', JSON.stringify(map));
      }

      const img = await fetch(`https://www.hollandsevelden.nl/images/icon/${bestand}`, {
        headers: { 'Referer': 'https://www.hollandsevelden.nl/' }
      });
      if (!img.ok) return new Response('Not found', { status: 404 });
      const body = await img.arrayBuffer();
      return new Response(body, {
        headers: { ...CORS, 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=86400' }
      });
    }

    // ── GET /team — trainingsschema en volledig programma van zcfc.nl ──
    // De clubsite toont ook beker- en oefenwedstrijden, die niet in de
    // competitiefeed van HollandseVelden zitten. 6 uur in KV bewaard.
    if (url.pathname === '/team' && request.method === 'GET') {
      const vers = url.searchParams.get('force') === '1';
      let bewaard = null;
      try { bewaard = await env.SCORERS.get('teampagina', { type: 'json' }); } catch (e) {}
      if (!vers && bewaard && (Date.now() - bewaard.tijd) < 6 * 3600000) {
        return new Response(JSON.stringify(bewaard.data), {
          headers: { ...CORS, 'Content-Type': 'application/json' }
        });
      }

      try {
        const res = await fetch(`https://zcfc.sportlink-clubsites.nl/${TEAM_PAGINA}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await res.text();
        const data = { training: parseTraining(html), programma: parseProgramma(html) };
        await env.SCORERS.put('teampagina', JSON.stringify({ data, tijd: Date.now() }));
        return new Response(JSON.stringify(data), {
          headers: { ...CORS, 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify(bewaard ? bewaard.data : { training: [], programma: [] }), {
          headers: { ...CORS, 'Content-Type': 'application/json' }
        });
      }
    }

    // ── GET /selectie — publiek ophalen ──
    if (url.pathname === '/selectie' && request.method === 'GET') {
      const data = await env.SCORERS.get('selectie');
      return new Response(data || '[]', {
        headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    // ── POST /selectie — opslaan met wachtwoord ──
    if (url.pathname === '/selectie' && request.method === 'POST') {
      const body = await request.json();
      if (!env.WACHTWOORD || body.password !== env.WACHTWOORD) {
        return new Response(JSON.stringify({ error: 'Ongeldig wachtwoord' }), {
          status: 401,
          headers: { ...CORS, 'Content-Type': 'application/json' }
        });
      }
      await env.SCORERS.put('selectie', JSON.stringify(body.selectie || []));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    // ── GET / — competitiedata ──
    if (!env.HV_API_KEY) {
      return new Response(JSON.stringify({
        error: 'HV_API_KEY ontbreekt — zet die als secret bij de worker in Cloudflare'
      }), { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    const pad = await zoekCompetitiePad(env);
    const data = (await haalCompetitie(pad, env.HV_API_KEY)) ||
                 (pad !== TERUGVAL ? await haalCompetitie(TERUGVAL, env.HV_API_KEY) : null);

    if (!data) {
      return new Response(JSON.stringify({ error: 'Geen competitiedata beschikbaar' }), {
        status: 502,
        headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(data), {
      headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }
};
