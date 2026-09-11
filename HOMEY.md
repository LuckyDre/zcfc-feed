# Homey-installatie

Overzicht van de Homey-opstelling thuis. Uitgelezen via de Homey-koppeling op 11-09-2026.
Momentopnames (batterijstand, meterstanden, wat er aan staat) veranderen; de structuur
hieronder — zones, apparaten, flows — is wat je wilt terugvinden.

**In het kort:** 18 zones, 74 apparaten, 35 flows (34 standaard + 1 advanced).

## Zones

```
Thuis
├── Begane grond
│   ├── Woonkamer      (14 apparaten)
│   ├── Eetkamer       (19)
│   ├── Keuken          (8)
│   ├── WC              (3)
│   ├── Gang            (1)
│   └── Entree          (1)
├── Eerste verdieping
│   ├── Bureau         (12)
│   ├── Slaapkamer      (7)
│   ├── Daan slaapkamer (4)
│   ├── Badkamer        (2)
│   ├── Wasruimte       (leeg)
│   ├── Gang            (leeg)
│   └── Overig          (leeg)
├── Tuin                (3)
└── Terras              (leeg)
```

## Apparaten per zone

### Begane grond › Woonkamer
| Apparaat | Soort |
|---|---|
| Bank links beneden, Bank links boven, Bank rechts | lamp |
| TV links, TV rechts | lamp |
| Woonkamerlamp | lamp |
| Woonkamer - Slimme Radiatorknop | thermostaat |
| Woonkamer sensor | beweging + temperatuur + lux |
| Dimmer woonkamer | draaidimmer |
| TV | stekker met verbruiksmeting |
| Ventilator | ventilator met verbruiksmeting |
| Woonkamer speaker, Tv in woonkamer | speaker |
| SB HUB Mini | bridge (SwitchBot) |

### Begane grond › Eetkamer
| Apparaat | Soort |
|---|---|
| Tafel 1, Tafel 2, Tafel 3 | lamp |
| Open haard links, Open haard rechts | lamp |
| Eetkamer tv links, Eetkamer tv rechts | lamp |
| Stereo links, Stereo rechts | lamp |
| Gitaren, Dart gang, Sjors | lamp |
| Lichtjes | stekker met verbruiksmeting |
| Dimmer eetkamer, Dimmer dart | draaidimmer |
| Occupancy Sensor | beweging + temperatuur + lux |
| Airco Eetkamer | stekker |
| Marantz retro | mediaspeler (stekker) |
| Gekloond 433 MHz-apparaat | 433 MHz-kloon, 2 knoppen |

### Begane grond › Keuken
| Apparaat | Soort |
|---|---|
| Keuken plafond, Keuken achter lamp, Keuken lichtstrip | lamp |
| Keuken achter stekker | lamp via stekker |
| Keuken - Slimme Radiatorknop | thermostaat |
| Keuken sensor | beweging + temperatuur + lux |
| PIR Sensor | beweging |
| Keuken Hub | speaker |

### Begane grond › WC
WC lamp · WC sensor (beweging/temp/lux) · WC - Slimme Radiatorknop

### Begane grond › Gang
Gang achter (lamp)

### Begane grond › Entree
Homey Energy Dongle — P1-meter: import/export per tarief, gasstand, actueel vermogen en fase-belasting.

### Eerste verdieping › Bureau
| Apparaat | Soort |
|---|---|
| Bureau 1, Bureau 2, Bureau 3 | lamp |
| Lange lichtstrip, Smart panel lights | lamp |
| Battletron Gaming Light Bar (2024) | lamp |
| Battletron Smart desk light Strip | lamp |
| Battletron Mouse Pad XXL | lamp |
| Bureau - Slimme Radiatorknop | thermostaat |
| Bureau sensor | beweging + temperatuur + lux |
| Bureau schakelaar | knop |
| AWST-8802 | afstandsbediening |

### Eerste verdieping › Slaapkamer
| Apparaat | Soort |
|---|---|
| Bed, slaapkamer plafond | lamp |
| Rolgordijn links, Rolgordijn rechts | rolgordijn |
| Kamer Andreas - Slimme Radiatorknop | thermostaat |
| Schakelaar slaapkamer | dubbele wipschakelaar |
| TRÅDFRI Afstandsbediening | afstandsbediening |

### Eerste verdieping › Daan slaapkamer
Airco Daan (stekker) · Airco Daan (airco) · Smart Plug (airco) · Kamer Daan - Slimme Radiatorknop

### Eerste verdieping › Badkamer
Badkamer - Slimme Radiatorknop · Badkamer speaker

### Tuin
Achterdeur (lamp) · Tuinslinger (lamp) · Tuin Sensor (beweging/temp/lux)

## Apparaten per type

| Type | Aantal |
|---|---|
| Lampen en lichtstrips | 37 |
| Sensoren, dimmers en knoppen | 13 |
| Slimme radiatorknoppen | 7 |
| Speakers | 4 |
| Rolgordijnen | 2 |
| Afstandsbedieningen | 2 |
| Stekkers | 2 |
| Airco's | 2 |
| Overig (tv, ventilator, mediaspeler, bridge, 433 MHz-kloon) | 5 |

## Flows

### Bureau
- Bureau aan (knop)
- Bureau uit
- Bureau Dimmer
- Bureau sfeerlicht
- Bureau gaming licht
- Bureau - beweging aan
- Bureau - 20 min geen beweging uit

### Tuin
- Tuin avond aan
- Tuin nacht aan (schema 06:00)
- Tuin nacht uit (schema 02:00)
- Tuin ochtend uit
- Tuin bezoeker aan
- Tuin bezoeker uit (avond / nacht / ochtend)

### Woonkamer en eetkamer
- Woonkamer verlichting (zonder plafondlamp)
- Woonkamer sfeerlicht
- Dimmer woonkamer - helderheid omhoog / omlaag
- Draai Dimmer - helderheid woonkamer & eetkamer
- Woonkamer/Eetkamer/Keuken uit (schema 10:00)

### Slaapkamer en rolgordijnen
- Slaapkamer aan/uit
- Slaapkamer sfeerlicht
- Welterusten
- Rolgordijnen omhoog / omlaag
- Rolgordijn links omhoog
- Rolgordijnen - links kort (stop)
- Rolgordijnen - rechts kort (stop)

### Algemeen dimmen
- Licht uit (knop)
- Dim · Dim hoog
- Feller (vloeiend) · Zachter (vloeiend)

### Advanced
- Verlichting — de enige advanced flow.

## Aandachtspunten (stand 11-09-2026)

- **Schakelaar slaapkamer: batterij 5%** — vervangen.
- **Woonkamer - Slimme Radiatorknop: batterij-alarm staat aan.**
- Rolgordijn rechts 42%, Woonkamer sensor 43% — binnenkort aan de beurt.
- Alle zeven radiatorknoppen stonden op `off` (zomerstand).
- Meterstanden: 45.671 kWh geïmporteerd (t1 23.173 / t2 22.498), 0 kWh teruggeleverd, 21.224 m³ gas.

## Losse eindjes

- Vier zones zijn leeg: Wasruimte, Gang (eerste verdieping), Overig, Terras.
- Twee apparaten heten allebei "Airco Daan" (een stekker en een airco) — verwarrend in flows.
- "Gekloond 433 MHz-apparaat" heeft geen zinnige naam; onduidelijk wat het aanstuurt.
- Een deel van de apparaten heeft nog een `migrate_v3`-knop: restant van een oude app-migratie.
