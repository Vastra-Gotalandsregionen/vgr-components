# VGR components

Komponentbibliotek för VGR's designsystem — byggt en gång som webbkomponenter (Stencil), och tillgängligt i React, Angular och Vue via genererade wrapper-paket.

Källan till design (färger, spacing, typografi m.m.) är Figma/Zero Height, och synkas automatiskt hit som design tokens.

## Kom igång

**Krav:**

- Node.js >=18
- npm

**Installera projektet:**

```bash
git clone https://github.com/Vastra-Gotalandsregionen/vgr-components.git
cd vgr-components
npm install
```

`npm install` körs **alltid från repo-roten**. Projektet är ett npm workspaces-monorepo — root-`package.json` länkar ihop alla paket under `packages/` lokalt, så att t.ex. `packages/react` kan använda `packages/core` utan att den behöver publiceras till npm först.

## Projektstruktur

```
packages/
  core/      @vgregion/components-core   — Stencil-komponenterna (källan till allt)
  react/     @vgregion/components-react  — genererad React-wrapper
  tokens/    @vgregion/design-tokens     — design tokens från Figma/Zero Height
  angular/   (kommer snart)
  vue/       (kommer snart)
```

Varje paket har sin egen `package.json` med egna scripts (`build`, `start`, `test` osv). Det finns i dagsläget inga samlade root-scripts — gå in i respektive paketmapp för att köra kommandon.

## Arbeta med komponenterna (packages/core)

```bash
cd packages/core
npm start
```

Startar en lokal dev-server med hot reload (`src/index.html`). Ändra i en `.tsx`-fil och spara för automatisk uppdatering.

```bash
npm run build
```

Bygger paketet på riktigt (bland annat `dist/`-mappen som andra paket och konsumenter använder). Kör detta innan du bygger `react`-paketet, så att den senaste koden faktiskt genererar wrapper-komponenter för de olika ramverken.

### Namnkonvention

Varje komponent döps enligt mönstret `vgr-<namn>` (t.ex. `vgr-button`) — obligatoriskt bindestreck enligt webbstandarden för custom elements, och `vgr`-prefixet skyddar mot namnkrockar med andra bibliotek. Events från komponenterna prefixas på samma sätt (`vgrClick` osv.).

### Testa

```bash
npm test
```

Kör Stencils spec-tester (renderar komponenterna i en simulerad DOM och kollar output). E2e-tester (riktig headless-browser via Playwright) är förberedda men pausade tills vidare — kommer aktiveras senare i projektet.

Första gången du kör e2e-tester behöver du hämta browser-binärer:

```bash
npx playwright install
```

## Design tokens (packages/tokens)

Tokens (färger, spacing osv.) kommer från Figma via zeroheights automatiska synk, som skapar en pull request mot det här repot när design ändras. PR:en granskas och mergas som vilken annan ändring som helst innan den slår igenom.

Källfilerna ligger i `packages/tokens/tokens/*.json`. Bygg om till CSS efter en import av nya tokens:

```bash
cd packages/tokens
npm run build
```

Resultatet hamnar i `packages/tokens/dist/css/tokens.css`.

**Om du utvecklar lokalt i `packages/core`** och vill se rätt tokens-styling: kör `npm run build` i `packages/tokens` (så filen finns i `node_modules` via workspace-länken), sedan `npm run build` (eller `npm start`) i `packages/core` — tokens-filen kopieras då automatiskt in i dev-servern.

## React (packages/react)

Genereras automatiskt från `packages/core` — filerna under `src/components/stencil-generated/` ska aldrig redigeras för hand.

```bash
cd packages/core && npm run build   # genererar wrapper-koden
cd ../react && npm run build        # bygger React-paketet
```

Användning i en React-app:

```tsx
import { VgrButton } from '@vgregion/components-react';
import '@vgregion/components-core/dist/styles.css';

<VgrButton variant="primary" onVgrClick={() => console.log('klick!')}>
  Spara
</VgrButton>;
```

## Angular (packages/angular)

Genereras automatiskt från `packages/core` via `@stencil/angular-output-target`, som standalone-komponenter (inget NgModule krävs). Byggs med `ng-packagr` (Angulars officiella biblioteksverktyg) — **inte** `tsc`, eftersom Angular kräver Ivy-kompilerad kod för att känna igen en komponent som importerbar.

```bash
cd packages/core && npm run build   # genererar wrapper-koden
cd ../angular && npm run build      # kompilerar med ng-packagr
```

Användning i en Angular-app (standalone-komponent):

```typescript
import { Component } from '@angular/core';
import { VgrButton } from '@vgregion/components-angular';

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
@import '@vgregion/components-core/dist/styles.css';
```

**Versionskrav:** Angular `>=22.0.0`. Håll `@angular/compiler`, `@angular/compiler-cli`, `ng-packagr` och `typescript` synkade mot varandra i `packages/angular/package.json` — se kommentar i filen om `peerDependencies` vid uppgradering.

## Vue (packages/vue)

Kommer snart.

## Storybook

Under utveckling kan man köra appen med hjälp av `npm run storybook` i mappen `apps/storybook.` Storybook-appen publiceras även via Github Pages, se nedan.

## Publicering / versionshantering

Projektet publiceras i nuläget via Github Pages vid push till `main`, och kan ses på https://vastra-gotalandsregionen.github.io/vgr-components/. Vi utgår ifrån projektets Storybook-app eftersom det i dagsläget är det som är intressant att publicera, både för direkt översikt över komponenterna och för inbäddning via zeroheight.

Publicering via npm kommer eventuellt.

## Bidra

1. Skapa en branch från `main`.
2. Gör dina ändringar. Om du ändrar en komponent i `packages/core`, kör `npm run build` i `core` och sedan i `react` för att säkerställa att wrapper-koden fortfarande genereras korrekt.
3. Kör `npm test` i `packages/core` innan du öppnar en pull request.
4. Öppna en pull request mot `main` för granskning.

**Committa aldrig** `node_modules/`, `dist/`, `www/` eller `loader/` — de är gitignorade och ska genereras lokalt via `npm install`/`npm run build`.

## TLDR Kom igång i projektet

### Klona projektet

```bash
git clone https://github.com/Vastra-Gotalandsregionen/vgr-components.git
cd vgr-components
```

---

### Installera Playwright

För att kunna köra tester.

```bash
npx playwright install
```

---

### Installera korrekt node-version

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

### Installera beroenden

```bash
npm install
```

### Bygg design tokens-filer

```bash
npm run build --workspace=@vgregion/design-tokens
```

---

### Bygg Stencil-komponenter, nödvändiga config-filer och stylesheets

```bash
npm run build-core
```

---

### Bygg paketen för respektive ramverk

```bash
npm run build --workspace=@vgregion/components-react
```

```bash
npm run build --workspace=@vgregion/components-angular
```

```bash
npm run build --workspace=@vgregion/components-vue
```

---

### Starta dev-servers

#### Core

```bash
npm run start --workspace=@vgregion/components-core
```

#### Storybook

```bash
npm run storybook --workspace=storybook-app
```

#### React

```bash
npm run dev --workspace=react-sandbox
```

#### Angular

```bash
npm run build --workspace=angular-sandbox
npm run start --workspace=angular-sandbox
```

#### Vue

```bash
npm run dev --workspace=vue-sandbox
```

---

## Bygga ny komponent

1. Kör igång Stencils komponentgenerator.

```bash
cd packages/core
npm run generate
```

2. Inställningar

- Döp komponenten enligt konvention vgr-komponentnamn
- Vi behöver i dagsläget inga av de extra alternativen, stylesheet eller tests, eftersom vi stylar med Tailwind och testen skrivs lite annorlunda
