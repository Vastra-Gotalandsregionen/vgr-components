# VGR components

Komponentbibliotek för VGR's designsystem — byggt en gång som webbkomponenter (Stencil), och tillgängligt i React, Angular och Vue via genererade wrapper-paket.

Källan till design (färger, spacing, typografi m.m.) är Figma/Zero Height, och synkas automatiskt hit som design tokens (via pull request).

## Projektstruktur

### Packages

```
packages/
  core/      @vastra-gotalandsregionen/components-core   — Stencil-komponenterna (källan till allt)
  tokens/    @vastra-gotalandsregionen/design-tokens     — design tokens från Figma/Zero Height
  react/     @vastra-gotalandsregionen/components-react  — genererad React-wrapper
  angular/   @vastra-gotalandsregionen/components-angular  — genererad Angular-wrapper
  vue/       @vastra-gotalandsregionen/components-vue  — genererad Vue-wrapper
```

Varje paket har sin egen `package.json` med egna scripts. I rootens package.json finns genvägar till de mest använda scriptsen, så man kan köra både `build` och `dev` ifrån rooten.

### Apps

```
apps/
  storybook/
  react-sandbox/
  angular-sandbox/
  vue-sandbox/
```

Under `apps/` ligger sandbox-appar för varje ramverk biblioteket stödjer, för att vi ska kunna testa komponenterna för var och ett av dem.

Här finns även en Storybook-app, som också deployas med hjälp av Github pages. Mer om detta under Publicering längre ned.

## Design tokens (packages/tokens)

Tokens (färger, spacing osv.) kommer från Figma via zeroheights automatiska synk, som skapar en pull request mot det här repot när design ändras. PR:en granskas och mergas som vilken annan ändring som helst innan den slår igenom.

Källfilerna ligger i `packages/tokens/tokens/*.json`. Man behöver bygga om från json till CSS efter en import av nya tokens:

```bash
npm run build:tokens
```

Resultatet hamnar i `packages/tokens/dist/css/tokens.css`.

## Kom igång

### Krav

- Node.js >=18
- npm

---

### 1: Klona projektet

```bash
git clone https://github.com/Vastra-Gotalandsregionen/vgr-components.git
cd vgr-components
```

---

### 2: Installera Playwright

För att kunna köra tester.

```bash
npx playwright install
```

---

### 3: Installera korrekt node-version

Inte ett måste för att köra projektet, men det underlättar samarbete. Aktuell node-version ligger i .nvmrc i rooten.

Rekommendation är att använda nvm för att byta node-version. Installera versionen i .nvmrc och sedan:

På mac räcker detta för att använda versionen från .nvmrc:

```bash
nvm use
```

På PC sätter man den manuellt:

```bash
nvm use v.X.X.X
```

---

### 4: Installera beroenden

```bash
npm install
```

`npm install` körs **alltid från repo-roten**. Projektet är ett npm workspaces-monorepo — root-`package.json` länkar ihop alla paket under `packages/` lokalt, så att t ex `packages/react` kan använda `packages/core` utan att den behöver publiceras till npm först.

---

### 5: Bygg alla nödvändiga filer

För att underlätta bygget av alla filer som behövs och som bara genereras vid bygge finns ett smidigt script i root:

```bash
npm run build:all
```

Detta genererar alla filer i rätt ordning. Det är alltså filer för design tokens, stencil-komponenter, configs, stylesheets, och allt som har med respektive ramverk att göra.

---

### 6: Starta dev-servers

Det finns scripts även för att starta dev-servers för core, alla app-playgrounds samt storybook i rooten. Det är alltså dessa:

```
dev:core
dev:react
dev:angular
dev:vue
storybook
```

---

## Arbeta med komponenterna (packages/core)

**Viktigt!** Commita aldrig `node_modules/`, `dist/`, `www/` eller `loader/` — de är gitignorade och ska genereras lokalt via `npm install`/`npm run build`.

### Köra dev-servern

Alla kommandon i exemplet körs från root.

```bash
npm run dev:core
```

Startar en lokal dev-server som utgår ifrån `src/index.html`.

Bra att veta här är att kommandot kör två saker samtidigt: Stencils dev-server och en bevakning av Tailwind. Den ser till att `src/index.html` får en uppdaterad `styles.css` varje gång du sparar.

Anledningen till att vi inte bara kör Stencils dev-server rakt av är att det skriver över `core/dist/`, som är mappen med det färdigbyggda paketet. Storybook, sandlådorna och React/Angular/Vue-paketen läser komponenterna därifrån, och den fylls av `npm run build:all`. Dev-servern bygger i stället sin egen kopia i mappen `www/`, som bara dev-sidan använder, och lämnar `dist/` ifred. Därför kan du ha den igång samtidigt som Storybook och sandlådorna utan att något försvinner.

Det betyder också att ändringar du gör i dev-servern inte syns i Storybook eller sandlådorna förrän du kört `npm run build:all`.

Det finns en begränsning dock: Tailwinds klasser genereras och läggs till i css-filen, men cachen gör att de inte syns direkt i webbläsaren. När du lägger till en Tailwind-klass som inte använts tidigare behöver du därför göra en hard refresh (eller bocka i "Disable cache" på Network-fliken i DevTools och köra vanlig refresh).

```bash
npm run build:core
```

Bygger paketet på riktigt (bland annat `dist/`-mappen som andra paket och konsumenter använder). Detta behöver köras innan man kör build-kommando för respektive ramverks package. Kör du `npm run build:all` sker ordningen rätt automatiskt, men det tar förstås längre tid.

### Bygga ny komponent

1. Skapa en ny branch från `main`

2. Kör igång Stencils komponentgenerator.

```bash
cd packages/core
npm run generate
```

3. Inställningar

- Döp komponenten enligt konvention vgr-komponentnamn (t.ex. `vgr-button`)
- Vi behöver i dagsläget inga av de extra alternativen, stylesheet eller tests, eftersom vi stylar med Tailwind och testen skrivs lite annorlunda

4. Bygg din komponent. Kolla gärna på redan existerande komponenter för att följa samma konvention. Ett exempel är i de fall där en prop har en konflikt med ett native attribute, såsom `ariaLabel`, då döper vi vår prop till `vgrAriaLabel`. Samma sak med events, där kör vi t ex `vgrClick`.

5. Glöm inte köra `npm run build:all` när du jobbat klart i komponentfilen.

6. Kontrollera att komponenten fungerar för alla 3 ramverk. Använd gärna sandbox-apparna i det här repot till det, eftersom det gör det lättare att testa för den som ska granska din komponent.

7. Kör ett test (se Testa nedan) och åtgärda eventuella problem.

8. Öppna en pull request mot `main` för granskning. I denna PR beskriver du vad koden gör och vad man behöver veta för att kunna göra en noggrann PR review. Om du önskar att något testas särskilt väl, beskriv hur det bör göras.

### Testa

```bash
npm run test
```

Detta kör Stencils spec-tester (renderar komponenterna i en simulerad DOM och kollar output). E2E-tester (riktig headless-browser via Playwright) är förberedda men pausade tills vidare — kommer aktiveras senare i projektet.

### Angående generering av komponenter, per ramverk

Oftast kör vi `npm run build:all`. Om man av någon anledning vill bygga till ett enstaka ramverk så fungerar det såhär.

#### React (packages/react)

Genereras automatiskt från `packages/core` — filerna under `src/components/stencil-generated/` ska aldrig redigeras för hand.

```bash
npm run build:core   # genererar wrapper-koden
npm run build:react  # bygger React-paketet
```

---

#### Angular (packages/angular)

**Versionskrav:** Angular `>=22.0.0`. Håll `@angular/compiler`, `@angular/compiler-cli`, `ng-packagr` och `typescript` synkade mot varandra i `packages/angular/package.json`.

Komponenter genereras automatiskt från `packages/core` via `@stencil/angular-output-target`, som standalone-komponenter (inget NgModule krävs). Byggs med `ng-packagr` (Angulars officiella biblioteksverktyg) — **inte** `tsc`, eftersom Angular kräver Ivy-kompilerad kod för att känna igen en komponent som importerbar.

```bash
npm run build:core     # genererar wrapper-koden
npm run build:angular  # kompilerar med ng-packagr
```

---

#### Vue (packages/vue)

Genereras automatiskt från `packages/core` via `@stencil/vue-output-target`, som vanliga Vue-komponenter. Byggs med Vite.

```bash
npm run build:core  # genererar wrapper-koden
npm run build:vue   # kompilerar paketet
```

---

## Storybook

Under utveckling kan man köra appen med hjälp av `npm run storybook` i mappen `apps/storybook.` Storybook-appen publiceras även via Github Pages, se rubriken Github Pages nedan.

Detta är det kommando som bygger den riktiga Storybook-appen till `apps/storybook/storybook-static/`:

```bash
npm run build-storybook
```

Detta körs i deploy-storybook.yml (som används i Github Actions-workflowet som deployar till Github Pages). Vi behöver alltså inte köra det här när vi utvecklar lokalt, men om man vill kontrollera ett äkta bygge innan man deployar kan man köra det kommandot.

## Publicering / versionshantering

### Github Pages

Projektet publiceras i nuläget via Github Pages vid push till `main`, och kan ses på https://vastra-gotalandsregionen.github.io/vgr-components/. Vi utgår ifrån projektets Storybook-app eftersom det i dagsläget är det som är intressant att publicera, både för direkt översikt över komponenterna och för inbäddning via zeroheight.

### Github Packages

Paketen publiceras till GitHub Packages (`npm.pkg.github.com`) under scopet `@vastra-gotalandsregionen`: https://github.com/orgs/Vastra-Gotalandsregionen/packages. Du behöver inte bygga eller publicera något själv: du pushar en git-tagg (se Göra en release nedan), och GitHub Actions gör resten.

Alla fyra paket (core, react, angular, vue) har alltid samma version.

### Göra en release

1. Se till att allt som ska med ligger på `main`.
2. Välj nästa versionsnummer. Kolla vad som är senast släppt med `git tag`. En version kan aldrig användas två gånger. I det här exemplet använder vi 0.2.2 som version.
3. Tagga och pusha:

```powershell
git checkout main
git pull
git tag release-0.2.2
git push origin release-0.2.2
```

4. Följ körningen under Actions, i workflowet "Publish packages". När den är klar ligger alla fyra paketen i registret med den nya versionen.

Taggen `release-0.2.2` ger version `0.2.2` åt alla paket. Det är bygget som sätter numret, så du behöver aldrig höja versioner för hand, och versionerna i `package.json` i repot ändras inte. Vad som är släppt ser du på taggarna och i registret. Bara den som har rätt att skapa `release-*`-taggar kan göra en release.

Om en körning fallerar efter att något paket hunnit publiceras går det versionsnumret inte att använda igen. Välj nästa nummer och tagga på nytt.

## Installera paketen i en konsument-app

Vill du använda komponentbiblioteket i ditt projekt? Kul! Såhär gör du.

Paketen är privata, så varje utvecklare behöver en egen token för att kunna använda sig av dem. Man behöver naturligt nog också ha ett Github-konto inom organisationen.

1. Skapa en personal access token (classic) på GitHub med behörigheten `read:packages`. Den visas bara en gång, så spara den.
2. Logga in en gång per dator:

```powershell
npm login --scope=@vastra-gotalandsregionen --auth-type=legacy --registry=https://npm.pkg.github.com
```

Användarnamn är ditt GitHub-användarnamn och lösenord är den token du skapade förut. Den sparas i `.npmrc` i din hemkatalog (skedde automatiskt när du körde npm login), och den ska aldrig läggas i repot.

3. Skapa en `.npmrc` i appens rot med följande rad. Den innehåller ingen token och kan checkas in:

```
@vastra-gotalandsregionen:registry=https://npm.pkg.github.com
```

4. Installera, till exempel för React:

```powershell
npm install @vastra-gotalandsregionen/components-react
```

### Användning av komponenter i ramverken

#### React (packages/react)

Användning i en React-app, i `main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@vastra-gotalandsregionen/components-core/dist/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Och i en komponent:

```tsx
import { VgrButton } from '@vastra-gotalandsregionen/components-react';

export function SaveButton() {
  return (
    <VgrButton
      variant="primary"
      text="Spara"
      onVgrClick={() => console.log('klick!')}
    />
  );
}
```

**CSS laddas en gång.** Importera `styles.css` en gång när appen startar, till exempel i `main.tsx`.

#### Angular (packages/angular)

Användning i en Angular-app (standalone-komponent):

```typescript
import { Component } from '@angular/core';
import { VgrButton } from '@vastra-gotalandsregionen/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VgrButton],
  templateUrl: './app.html',
})
export class App {}
```

```html
<vgr-button variant="primary" (vgrClick)="onSave()">Spara</vgr-button>
```

**Viktigt — css laddas annorlunda än i React.** Angular CLI förstår inte en CSS-import skriven direkt i en `.ts`-fil. Lägg istället till en `@import`-rad i appens globala `src/styles.css`:

```css
@import '@vastra-gotalandsregionen/components-core/dist/styles.css';
```

---

#### Vue (packages/vue)

Användning i en Vue-app, i `main.ts`:

```typescript
import { createApp } from 'vue';
import '@vastra-gotalandsregionen/components-core/dist/components/define-all.js';
import '@vastra-gotalandsregionen/components-core/dist/styles.css';
import App from './App.vue';

createApp(App).mount('#app');
```

Och i en komponent:

```typescript
<script setup lang="ts">
import { VgrButton } from '@vastra-gotalandsregionen/components-vue'

function onSave() {
  console.log('Klick!')
}
</script>

<template>
  <VgrButton variant="primary" @vgrClick="onSave" text="Spara!" />
</template>
```

**Viktigt: `define-all.js` måste importeras en gång.** Vue-komponenterna är tunna omslag runt de riktiga webbkomponenterna, och webbkomponenterna måste registreras i webbläsaren innan de fungerar. Det gör `define-all.js`: bara att importera filen räcker, du behöver inte anropa någon funktion. Gör det en gång när appen startar, till exempel i `main.ts` (se exemplet ovan). Glömmer du det blir knapparna inte riktiga komponenter, och du får troligen inget felmeddelande.

`define-all.js` registrerar alla komponenter i paketet på en gång.

**CSS laddas som i React:** importera `styles.css` en gång i `main.ts`. Vite hanterar CSS-importer direkt, så ingen extra konfiguration behövs.

---

## Relaterade projekt

### VGR Icons

Ett bibliotek av alla de ikoner som VGR Designsystem har tillgång till. Detta ligger på vår självhostade Gitlab: https://git.vgregion.se/ellbr9/vgr-icons.

Detta bibliotek kommer eventuellt kunna användas för att t ex skicka med en ikon in i en VgrButton.

Detta är inte helt bestämt ännu. Mer info kommer.
