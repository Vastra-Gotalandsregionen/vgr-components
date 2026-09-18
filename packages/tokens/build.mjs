import StyleDictionary from 'style-dictionary';
import { writeFileSync } from 'node:fs';

// Mappar toppnivå-wrapper-namn från zeroheight ("X tokens") till --color, enligt Tailwind-standard.
// Okänd kategori kastar fel
const WRAPPER_PREFIX_MAP = {
  'color tokens': 'color',
  // 'spacing tokens': 'spacing',
};

function renameTopLevelWrapper(dictionary) {
  const result = {};
  for (const [topKey, topValue] of Object.entries(dictionary)) {
    if (/ tokens$/i.test(topKey) && typeof topValue === 'object') {
      const prefix = WRAPPER_PREFIX_MAP[topKey.toLowerCase()];
      if (!prefix) {
        throw new Error(
          `Okänd token-wrapper "${topKey}" - lägg till en rad i WRAPPER_PREFIX_MAP i build.mjs.`
        );
      }
      result[prefix] = topValue;
    } else {
      result[topKey] = topValue;
    }
  }
  return result;
}

// Självrefererande @theme-block, autogenererat från token-namnen.
function tailwindThemeFormat({ dictionary }) {
  const colorVars = dictionary.allTokens
    .filter((t) => t.path[0] === 'color')
    .map((t) => `  --${t.name}: var(--${t.name});`)
    .join('\n');
  return `/* Auto-genererad. Redigera ej manuellt - se tokens/build.mjs. */\n@theme {\n${colorVars}\n}\n`;
}

function makeConfig(sourceFile, destination, selector, extraFiles = []) {
  return new StyleDictionary({
    source: [sourceFile],
    hooks: {
      preprocessors: {
        'rename-top-level-wrapper': renameTopLevelWrapper,
      },
      formats: {
        'css/tailwind-theme': tailwindThemeFormat,
      },
    },
    preprocessors: ['rename-top-level-wrapper'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/',
        files: [
          {
            destination,
            format: 'css/variables',
            options: { selector },
          },
          ...extraFiles,
        ],
      },
    },
  });
}

const light = makeConfig(
  'tokens/Light.tokens.json',
  'tokens-light.css',
  ':root',
  [{ destination: 'tailwind-theme.css', format: 'css/tailwind-theme' }]
);
const dark = makeConfig(
  'tokens/Dark.tokens.json',
  'tokens-dark.css',
  '[data-theme="dark"]'
);

await light.buildAllPlatforms();
await dark.buildAllPlatforms();

writeFileSync(
  'dist/css/tokens.css',
  `/* Auto-genererad fil för import, redigera ej manuellt. */\n@import './tokens-light.css';\n@import './tokens-dark.css';\n@import './tailwind-theme.css';\n`
);
console.log('✔︎ dist/css/tokens.css (samlad css för design tokens)');
