import StyleDictionary from 'style-dictionary';
import { writeFileSync } from 'node:fs';
/**
 * Removes top level wrapper names ending with " tokens", like "Color tokens", which is included in token categories from zeroheight. Result: "Color tokens.Accent.Orange" becomes "Accent.Orange"
 * */
function stripTopLevelWrapper(dictionary) {
  const result = {};
  for (const [topKey, topValue] of Object.entries(dictionary)) {
    if (/ tokens$/i.test(topKey) && typeof topValue === 'object') {
      Object.assign(result, topValue);
    } else {
      result[topKey] = topValue;
    }
  }
  return result;
}

function makeConfig(sourceFile, destination, selector) {
  return new StyleDictionary({
    source: [sourceFile],
    hooks: {
      preprocessors: {
        'strip-top-level-wrapper': stripTopLevelWrapper,
      },
    },
    preprocessors: ['strip-top-level-wrapper'],
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
        ],
      },
    },
  });
}

const light = makeConfig(
  'tokens/Light.tokens.json',
  'tokens-light.css',
  ':root'
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
  `/* Auto-genererad fil för import, redigera ej manuellt. */\n@import './tokens-light.css';\n@import './tokens-dark.css';\n`
);
console.log('✔︎ dist/css/tokens.css (samlad css för design tokens)');
