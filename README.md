# it2810-webutvikling-h18-prosjekt-3-30


## Innhold og funksjonalitet

Prosjektet er en tredelt react native-applikasjon med en skritteller, en todo-liste og en kontaktliste. Vi valgte å dele appen i tre egentlig helt uavhengige deler, og gav hvert av gruppemedlemmene ansvaret for en egen del. Slik fikk alle like god mulighet til å bli kjent med react native. 

### Skritteller
Skrittelleren har funksjonalitet for å holde tellingen på antall skritt gått det siste døgnet. Dette gjøres gjennom iOS' Core Motion og Androids Google Fit. Det er også funksjonalitet for å sette et mål for antall skritt siste døgn, og appen viser en bar som indikerer progresjon mot målet.

### TODO-liste
TODO-listen har funksjonalitet for å legge til gjøremål, slette gjøremål, og markere gjøremål som gjennomført. Listen oppdateres ved interaksjon fra brukeren.

### Kontaktliste
Kontaktlisten har funksjonalitet for å legge til nye kontakter med navn og nummer. Man kan trykke på en kontakt for å komme inn på en detaljert kontaktside. 
*Merk at når man legger til en kontakt må man oppdatere siden ved å «sveipe nedover fra toppen for at den nye kontakten skal synes.  Se [Gif](https://ibb.co/d7q2af)*
Kontaktene lagres asynkront.

## Kjente problemer, feil og mangler

### Already managing a GoogleApiClient with id 0
Feilen oppstår når koden endres, og expo gjennomfører hot reload på en Android-telefon. Vår tolkning av problemet er at det skyldes skrittellerens forbindelse med Google Fit. Når hot reload gjennomføres, forsøkes det å opprette en ny forbindelse til Google Fit, som er identisk med forbindelsen som eksisterte før hot reload. Dette lar seg ikke gjøre før expo oppdateres og den gamle forbindelsen stanses.

I en reell brukssituasjon vil nok ikke denne feilen oppstå, ettersom det ikke skjer noen hot reload av kode, men det er ikke utenkelig at det kan oppstå en lignende konflikt med andre applikasjoner som også bruker Google Fits skritteller. isten oppdateres ved relene lagres asnkront

### Sette ugyldig mål i skrittelleren
En bruker kan sette «.» eller «-» som mål i skrittelleren. Dette fører til krasj. Ved eventuell videreutvikling ville det blitt lagt til sjekker for gyldig input. 

### Eksplisitt rendring av mer enn én navigator
På iOS-enheter gis det en advarsel om dette, som oppfordrer til at én og bare én navigator skal rendres. Ved eventuell videreutvikling ville dette blitt sett på.

### Slette kontakter
Det er ikke mulig å slette kontakter. Ved eventuell videreutvikling ville denne funksjonaliteten blitt lagt til.

## Teknologier
### Pedometer
Pedometer er en komponent i Expo-biblioteket. Avhengig av telefonens plattform bruker den Core Motion (iOS) eller Google Fit (Android) til å finne brukerens skrittall. Denne komponenten er dokumentert på [Expo sine sider](https://docs.expo.io/versions/v30.0.0/sdk/pedometer), der det også finnes et kodeeksempel som mer eller mindre er kopiert til dette prosjekt.

Denne komponenten ble valgt etter at det ble forsøkt å lage pushvarsel-funksjonalitet. Dette tok en del tid, og da ideen ble skrinnlagt ble det sett som hensiktsmessig å bruke en komponent der man selv slapp å implementere noe avansert, men heller kunne fokusere på asynkron lagring.


### React-navigation
React Navigation er et bibliotek som setter opp både routing og navigasjon for React Native – det vil si navigasjon mellom skjermbilder. Biblioteket installeres med *npm install --save react-navigation*. 

For å sette opp en navigasjon, må man først importere type navigasjon man ønsker å bruke. Her kan man velge mellom en rekke forskjellige typer. Oversikt over disse finnes i den [offisielle dokumentasjonen](https://reactnavigation.org/docs/en/api-reference.html).

Disse navigasjonsfunksjonene tar inn to argumenter : *RouteConfigs* og *NavigatorConfig(optional)*. RouteConfigs setter opp navn og rute/path til skjermene i navigasjonen, mens NavigatorConfig setter opp standardinnstillingene for hvordan denne navigasjonen skal være. Når navigasjonen er satt opp og rutene/pathen til de forskjellige skjermene er satt opp, må man lage individuelle komponenter for hver av skjermene. I eksempelet under vil dette være *ScreenOne.js, ScreenTwo.js* og *ScreenThree.js*.

  
Eksempel ved bruk av navigasjonstypen createMaterialTopTabNavigator (relativt likt for de andre typene):

<details>
  <summary>Klikk for å se kodeeksempel</summary>
  
```javascript
import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';

export default class App extends React.Component {
	render() {
		return (
			<Toptab/>
		);
	}
}

const Toptab = createMaterialTopTabNavigator(
	{ //RouteConfigs:
		ScreenOne:ScreenOne,
		ScreenTwo: ScreenTwo,
		ScreenThree: ScreenThree
	},
	{ // TabNavigatorConfig:
	// navigationOptions: () => ({
	// The default options for screens
	// }),
		animationEnabled: false,
		swipeEnabled: true,
		tabBarOptions: {
			//Styling options. See official documentation for possibilites
	},
);
```

</details>



Grunnene til at vi har valgt å bruke dette biblioteket er at det er relativt enkelt å sette opp, det er plattform uavhengig, og kildekoden er skrevet i Javascript. I prosjektet vårt valgte vi å bruke *createMaterialTopTabNavigator* og *createStackNavigator* til våre navigasjoner. *createMaterialTopTabNavigator* er en fin måte å sette opp tab-navigasjon, med funksjonalitet for swiping mellom skjermene – som forenkler navigasjon i appen.

Den andre navigasjonen vi bruker er for håndtering mellom de forskjellige skjermene i kontakter. Her valgte vi å bruke en *stackNavigator,* men i ettertid ser vi at vi også kunne ha brukt en *switchNavigator*. En av de store forskjellene mellom disse er at *switchNavigator* resetter navigasjonen til standard når man navigerer bort, mens *stackNavigator* har mulighet til å legge til tilbake-navigasjon i stacken, noe som ikke går i *switchNavigator*.

### React-native-elements
*React-native-elements* er et bibliotek som er laget for å samle  et stort utvalg komponenter og lage et komplett UI-kit. Biblioteket installeres med *npm install --save react-native-elements*. 

Deretter importerer man de ønskede komponentene der man vil bruke dem. En liste over de tilgjengelige komponentene finnes i [den offisielle dokumentasjonen](https://react-native-training.github.io/react-native-elements/docs/0.19.1/overview.html).

  

<details>
  <summary>Klikk for å se kodeeksempel</summary>

```javascript
import React from 'react';
import { Button } from 'react-native-elements';
  
export default class bt extends React.Component {

render() {

	return (
		<Button
			title='Click me'
			{*/ Kan legge inn mange ulike props her for å endre til ditt behov/*}
		/>
	);
}
}
```

</details>
 
Vi valgte å bruke dette biblioteket fordi *react-native-elements* er en veldig enkel måte å sette opp UI komponenter på, og endre disse til vårt behov. Komponentene i biblioteket kan bruke de samme propsene som *react-native*, men tar i tillegg andre props, som gjør at oppsett og utforming blir lettere. Ellers er *react-native-elements* godt dokumentert og plattform uavhengig

### Native-base
*Native-base* er også et bibliotek for UI-komponenter likt *react-native-elements*. Fra dette biblioteket har vi kun brukt *ListItem*, da *elements*-biblioteket ikke hadde støtte for å legge til for eksempel checkbox i sitt *ListItem*. Ellers har vi prøvd å bruke UI-komponenter fra *react-native-elements*. Oversikt over komponentene i bibioteket finnes i [den offisielle dokumentasjonen](https://docs.nativebase.io/Components.html#Components)

### Skille mellom operativsystemer
I skrittelleren er det en progresjonsbar-komponent som er systemspesifikk – baren på Android er altså ikke lik baren på iOS. For å løse dette er det lagd to filer som hver haren komponent med samme navn: *progressBar.android.js* og *progressBar.ios.js*. Når skrittelleren importerer *./progressBar* sjekkes hvilken type operativsystem som brukes automagisk, og riktig komponent importeres.


## Testing
### Oppsett
Mesteparten av tiden som gikk med til testing ble brukt på å faktisk få testene til å kjøre. Når testene først ble forsøkt kjørt taklet de ikke imports fra biblioteker utenfor react-native og expo. Dette ble til dels fikset, men førte til en uendelig mengde problemer når disse først ble importert, da Jest tilsynelatende ikke klarte å tolke syntaksen i bibliotekene. En delvis løsning her var å legge inn alle bibliotekene hver for seg i *transformIgnorePatterns* i *package.json*-filen, men ettersom testene nøster seg gjennom alle slags sub-mapper og filer, endte dette til slutt i en fil som ikke kunne tolkes selv etter den var lagt til slik.

Til slutt fant vi følgende løsning på problemene:
* Sørg for at *babel-core*, *babel-jest, jest* og *react-test-renderer* er installert i dev-dependencies.
* Installer *jest-cli* globalt (*npm i jest-cli --global*). Dette gir tilgang til kommandoen jest i terminalen.
* Installer *jest-expo* i dev-dependencies
* Oppdater *package.json* med:
```json
"scripts": {
  "test": "node_modules/.bin/jest"
},
"jest": {
  "preset": "jest-expo"
  "transformIgnorePatterns": [
     "/node_modules/(?!native-base)/"
   ]
}
```
* Testene kan nå kjøres ed kommandoen **jest**, ikke *npm test*

### Hva har blitt testet
De kodede testene som er gjennomført er i stor grad snapshot-tester, samt noe testing av state-oppdaterende tester. Det har blitt forsøkt å finne mulige måter å teste asyncStorage på, men vi har ikke lyktes med dette.  Dette utdypes lengre ned.

Spor av disse problemene kan observeres i testen *ContactDetails.test.js*, som feiler da den prøver å lese en state, men ikke får det til.

Vi har testet kontinuerlig gjennom hele prosjektet på forskjellige enheter; iPhone 5s, Samsung Galaxy S9+ og Honor 8. Ved å teste på ulike enheter har vi fått et inntrykk av hvordan appen fungerer i praksis. Vi har observert at asynkron lagring og lasting fungerer, og at grensesnittet responderer som ønsket. 

### Hva har blitt forsøkt
Vi har forsøkt å sette opp tester for asynkron lagring, men uten hell.  Vi har forsøkt å følge en YouTube-tutorial som tester nettopp dette, men med litt bruk av Enzyme. Derfor forsøkte vi å bruke alternative funksjoner i *react-test-renderer*, men dette gikk altså ikke. Denne koden er ikke pushet til github, men en detaljert beskrivelse av hvordan testforsøkene ser ut er vedlagt under, men antar at det ikke er av interesse for andre enn fagstab. 

<details>
  <summary>Klikk for å se detaljert beskrivelse</summary>
	
Videoen som ble forsøkt fulgt er [linket til her](https://www.youtube.com/watch?time_continue=532&v=uo0psyTxgQM). Videoen er også tekstlig beskrevet på [denne siden](https://www.leighhalliday.com/testing-asynchronous-components-mocks-jest)

Vår kode ser slik ut:

Asynkfunksjonen som skal testes:
```javascript
import _asyncGetGoal from "./asyncGetGoal"

    _retrieveData = async () => {
        try {
            const goal = await _asyncGetGoal(); //Dette er funksjonen som mockes
            if (parseInt(goal) > 0) {
                this.setState({goalStepCount: parseInt(goal)})
                this.setState({inputText: goal})
            }

        } catch (error) {
            console.error(error);
        }
    }
```


Delen av asynkfunksjonen som skal mockes:
```javascript
import {AsyncStorage} from 'react-native'

export default async() => {
    const goal = await AsyncStorage.getItem('goal');
  return goal;
}
```
Den mockede funksjonen:
```javascript
export default async() => {
  return await '8000';
}
```
Testen:
```javascript
import React from 'react';
import StepCounter from '../components/ui/steps/StepCounter';
import TestRenderer from 'react-test-renderer';

jest.mock('../components/ui/steps/_asyncGetGoal')

it("Gets goal from async storage", (done) => {
  const instanceOf = TestRenderer.create(<StepCounter/>);

    setTimeout(() => {

      const testInstance = instanceOf.root;
      expect(testInstance.instance.state.goalStepCount).toEqual('8000');
      done();

    });
});
```
Expecten i testen feiler med oppgitt verdi '0'
Merk at denne test-koden bare er en av mange forsøkte varianter som mislyktes.

Nøyaktig hva som hindrer alt i å fungere er vi ikke helt sikre på, men vi er rimelig sikre på at mockingen er gjort ordentlig, og at feilen/mangelen ligger i testen – nærmere bestemt i forsøket på å lese state fra *testInstance*. Vi tror at dette ville gått med bruk av Enzyme.``

</details>


### Hvordan videre testing ville blitt gjort
Vi har dannet oss et bilde av hvordan mocking kan brukes til å teste asyncStorage, samt hvordan strukturen i en større test vil se ut. Den siste brikken i puslespillet er da å kunne sjekke states under testing. Med det på plass, ville vi kunne testet at lagring og lasting fungerer ordentlig for alle komponentene i systemet. 

## Komponentstruktur
<a href="https://ibb.co/dazxt0"><img src="https://preview.ibb.co/iz3OY0/Struktur.png" alt="Struktur" border="0"></a>
