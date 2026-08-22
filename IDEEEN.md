# ZCFC Nieuwsfeed — ideeënlijst

Doel van de tool: spelers, trainers en toeschouwers meer info rondom ZCFC geven.
Bijgewerkt 22-08-2026.

## Klaar

| # | Idee | Voor wie |
|---|---|---|
| 1 | Reisinfo uitwedstrijden (sportpark, adres, route, kopieerknop) | toeschouwers |
| 5 | Agenda-export (.ics) van alle resterende wedstrijden | spelers |
| 9 | Tegenstander-scan (positie, vorm, thuis/uit-cijfers, onderling) | trainers |
| 10 | Periodestand + nacompetitiekans, automatisch uit de API | trainers |
| — | Wedstrijdschema op Overzicht | iedereen |
| — | Clublogo's gerepareerd (HollandseVelden hernoemde de bestanden) | — |
| — | Worker zelfherstellend: vindt seizoen én poule zelf | — |
| 2 | Zaterdagoverzicht hele poule (tab Wedstrijden) | toeschouwers |
| 11 | Wat-als-simulator voor de stand (tab Kansen) | trainers |
| 6 | Installeerbaar op telefoon (PWA) | spelers |
| 8 | Trainingstijden van zcfc.nl (tab Club) | spelers |

## Nog open

| # | Idee | Voor wie | Aantekening |
|---|---|---|---|
| 13 | Beker- en oefenwedstrijden tonen | iedereen | zcfc.nl toont duels die NIET in de competitiefeed zitten. Worker-endpoint `/team` levert ze al mee; alleen de weergave ontbreekt nog |

## Vervallen

> **Leidraad:** niets bouwen dat individuele spelers publiek uitlicht of
> afrekent. De tool gaat over het team en de competitie. Toets nieuwe ideeën
> hieraan vóór je ze voorstelt.

**3 — Wedstrijdfoto's koppelen aan zaanslicht.com.** Op verzoek van Andreas
geschrapt (22-08-2026): foto's live zetten is nooit leuk. Niet opnieuw
voorstellen.

**7 — Gele/rode kaarten & schorsingen bijhouden.** Geschrapt (22-08-2026):
niet leuk voor spelers om bij te houden. Valt onder de leidraad hierboven.

**4 — Man of the Match-stemming.** Geschrapt (22-08-2026): valt onder dezelfde
leidraad — stemmen op individuele spelers.

**12 — Alle ZCFC-teams (2, 3, jeugd).** Kan niet via HollandseVelden: die heeft
alleen standaardteams (eerste elftallen), in geen enkel district reserve- of
jeugdcompetities. Zou Sportlink vereisen (clubcode ZCFC = BBFX24R, client_id via
de club). Voetbal.nl werkt niet zonder login.
