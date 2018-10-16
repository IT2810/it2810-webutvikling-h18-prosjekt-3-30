# it2810-webutvikling-h18-prosjekt-3-30


## Innhold og funksjonalitet

Prosjektet er en tredelt react native-applikasjon med en skritteller, en todo-liste og en kontaktliste. Vi valgte å dele appen i tre egentlig helt uavhengige deler, slik at hvert av gruppemedlemmene fikk ansvaret for en egen del. Slik fikk alle like god mulighet til å bli kjent med react native. 

Skrittelleren har funksjonalitet for å telle skritt mens appen er åpen, samt holde tellingen på antall skritt gått det siste døgnet. Dette gjøres gjennom iOS' Core Motion og Androids Google Fit. Det er også funksjonalitet for å sette et mål for antall skritt siste døgn, og appen viser en bar som indikerer progresjon mot målet.

TODO-listen har funksjonalitet for å legge til gjøremål, slette gjøremål, og markere gjøremål som gjennomført. Gjøremålene lagres asynkront.

Kontaktlisten har funksjonalitet for å legge til nye kontakter med navn og nummer. Man kan trykke på en kontakt for å komme inn på en detaljert kontaktside (Som per nå ikke viser ytterligere detaljer, men da dette lett kan utvides om man ønsker dette senere). 
*Merk at når man legger til en kontakt må man oppdatere siden ved å «sveipe nedover fra toppen se [Gif](https://ibb.co/d7q2af)» for at den nye kontakten skal synes.*
Kontaktene lagres asynkront.

## Kjente problemer, feil og mangler

### Already managing a GoogleApiClient with id 0
Feilen oppstår når koden endres, og expo gjennomfører hot reload på en Android-telefon. Vår tolkning av problemet er at det skyldes skrittellerens forbindelse med Google Fit. Når hot reload gjennomføres, forsøkes det å opprette en ny forbindelse til Google Fit, som er identisk med forbindelsen som eksisterte før hot reload. Dette lar seg ikke gjøre før expo oppdateres og den gamle forbindelsen stanses.

I en reell situasjon vil nok ikke denne feilen oppstå, ettersom det ikke skjer noen hot reload av kode, men det er ikke utenkelig at det kan oppstå en lignende konflikt med andre applikasjoner som også bruker Google Fits skritteller. 

### Sette ugyldig mål i skrittelleren
En bruker kan sette «.» eller «-» som mål i skrittelleren. Dette fører til krasj. Ved eventuell videreutvikling ville det blitt lagt til sjekker for gyldig input. 

### Eksplisitt rendring av mer enn én navigator
På iOS-enheter gis det en warning om dette, som oppfordrer til at én og bare én navigator skal rendres. Ved eventuell videreutvikling ville dette blitt sett på.

### Slette kontakter
Det er ikke mulig å slette kontakter. Ved eventuell videreutvikling ville denne funksjonaliteten blitt lagt til.
