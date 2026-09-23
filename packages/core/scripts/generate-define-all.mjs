/**
 * Generates dist/components/define-all.js
 *
 * Registers each component one by one. Stencil's way of loading them, `defineCustomElements`, doesn't work for the Storybook app. The product of this script makes regular `import` statements instead.
 */

import { readdirSync, writeFileSync } from 'node:fs';

const dir = 'dist/components';
const files = readdirSync(dir).filter(f => /^vgr-.*\.js$/.test(f));
const content = files.map(f => `import './${f}';`).join('\n') + '\n';

writeFileSync(`${dir}/define-all.js`, content);
console.log(`✔︎ ${dir}/define-all.js (${files.length} komponenter)`);
