# VGR components

Komponentbibliotek för VGR's designsystem — byggt en gång som webbkomponenter (Stencil), och tillgängligt i React, Angular och Vue via genererade wrapper-paket.

Källan till design (färger, spacing, typografi m.m.) är Figma/Zero Height, och synkas automatiskt hit som design tokens (via pull request).

## Dokumentation

Dokumentationen finns i Storybook tillsammans med komponenterna: https://vastra-gotalandsregionen.github.io/vgr-components/

Vill du använda biblioteket i ett projekt, titta under **Använda biblioteket** (installation, React, Angular, Vue). Vill du bidra, börja med Kom igång nedan och fortsätt sedan under **Bidra till biblioteket**.

## Projektstruktur

### Packages

```
packages/
  core/      @vastra-gotalandsregionen/components-core   — Stencil-komponenterna (källan till allt)
  tokens/    @vastra-gotalandsregionen/design-tokens     — design tokens från Figma/Zero Height, publiceras inte
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

Här finns även en Storybook-app, som också deployas med hjälp av Github pages. Mer om detta under Publicering i Storybook Docs / Storybook och publicering.

## Kom igång

### Krav

- Node.js `^22.22.3`, `^24.15.0` eller `>=26.0.0` (det är Angulars krav, det snävaste av beroendena). Exakt version vi använder står i `.nvmrc`, och det är den som CI använder.
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

Repot har `engine-strict` påslaget, så `npm install` stoppar med ett tydligt fel om din Node-version inte uppfyller kraven. Använd versionen i `.nvmrc` för att slippa det.

Mac/Linux (nvm läser `.nvmrc` själv):

```bash
nvm use
```

Windows (nvm-windows läser inte `.nvmrc`, så versionen anges manuellt):

```powershell
nvm install X.X.X
nvm use X.X.X
```

Byt `X.X.X` mot versionen som står i `.nvmrc`.

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

### 7: Utgå ifrån Storybook-dokumentationen

Nu bör du ha fått igång projektet och kan från och med nu utgå ifrån dokumentationen i Storybook docs. Starta Storybook med `npm run storybook` och följ instruktionerna för att bidra till biblioteket.

---

## Relaterade projekt

### VGR Icons

Ett bibliotek av alla de ikoner som VGR Designsystem har tillgång till. Detta ligger på vår självhostade Gitlab: https://git.vgregion.se/ellbr9/vgr-icons. För att använda ikon-biblioteket, följ instruktionerna under Installera i projektets README.
