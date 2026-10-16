import { existsSync, statSync, readdirSync } from 'node:fs';

// Filer som alltid ska finnas efter ett lyckat bygge.
const fixed = ['dist/styles.css', 'dist/index.js', 'dist/components/index.js', 'dist/components/define-all.js'];

// En fil per komponent, hittad automatiskt från mapparna i src/components/.
// En ny komponent kontrolleras alltså utan att något behöver läggas till här.
const components = readdirSync('src/components', { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => `dist/components/${entry.name}.js`);

const required = [...fixed, ...components];

const problems = required.filter(file => {
  if (!existsSync(file)) return true;
  return statSync(file).size === 0;
});

if (problems.length === 0) {
  console.log(`Bygget verifierat: alla ${required.length} filer finns.`);
  process.exit(0);
}

console.error('\nBYGGET ÄR OFULLSTÄNDIGT. Dessa filer saknas eller är tomma:');
for (const file of problems) console.error(`  - ${file}`);

console.error('\nInnehåll i dist/:');
if (existsSync('dist')) {
  for (const name of readdirSync('dist')) {
    const time = statSync(`dist/${name}`).mtime.toISOString();
    console.error(`  ${time}  ${name}`);
  }
} else {
  console.error('  dist/ finns inte alls.');
}
console.error(`\nTid nu: ${new Date().toISOString()}`);
process.exit(1);
