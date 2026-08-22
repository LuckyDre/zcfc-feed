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

## Nog open

| # | Idee | Voor wie | Aantekening |
|---|---|---|---|
| 3 | Wedstrijdfoto's koppelen aan zaanslicht.com | toeschouwers | Onderscheidend; vraagt eerst uitzoekwerk in het fotografie-project — apart houden van dit project |
| 2 | Zaterdagoverzicht van de hele poule | toeschouwers | Data zit al in de feed, alleen tonen |
| 7 | Kaarten & schorsingen bijhouden | trainers/spelers | Vraagt invoerscherm; patroon van `/scorers` in de worker hergebruiken |
| 4 | Man of the Match-stemming | toeschouwers | Idem: nieuwe KV-sleutel + endpoint |
| 11 | Wat-als-simulator voor de stand | trainers | Puur rekenwerk op bestaande data |
| 6 | Installeerbaar op telefoon (PWA) | spelers | Icoon op thuisscherm, opent zonder browserbalk |
| 8 | Trainingstijden & veldindeling van zcfc.nl | spelers | Ophalen met ruwe curl, niet met een samenvatter |

## Vervallen

**12 — Alle ZCFC-teams (2, 3, jeugd).** Kan niet via HollandseVelden: die heeft
alleen standaardteams (eerste elftallen), in geen enkel district reserve- of
jeugdcompetities. Zou Sportlink vereisen (clubcode ZCFC = BBFX24R, client_id via
de club). Voetbal.nl werkt niet zonder login.
