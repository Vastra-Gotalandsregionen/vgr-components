// Läser alla .svg-filer i src/assets och skriver src/assets/svgs.generated.ts,
// med en exporterad sträng per fil (help_circle.svg -> helpCircle).
// Redigera aldrig den genererade filen för hand, den kommer att skrivas över ändå
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = join(root, 'src', 'assets');
const outFile = join(assetsDir, 'svgs.generated.ts');

function toName(file) {
  return file
    .replace(/\.svg$/i, '')
    .split(/[_\- ]+/)
    .filter(Boolean)
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

function clean(file, raw) {
  let s = raw
    .replace(/^﻿/, '')
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title[\s\S]*?<\/title>/gi, '')
    .replace(/<desc[\s\S]*?<\/desc>/gi, '')
    .trim();

  const match = s.match(/<svg[\s\S]*<\/svg>/i);
  if (!match) throw new Error(`${file}: hittade ingen <svg>-tagg.`);
  s = match[0];

  // Säkerhet: inget som kan köra kod eller hämta något utifrån.
  if (/<script|<foreignObject|\son[a-z]+\s*=|javascript:/i.test(s)) {
    throw new Error(`${file}: innehåller script, foreignObject eller händelseattribut. Avbryter.`);
  }

  // Storleken ska styras av vgr-icon, så width/height tas bort på rot-taggen.
  s = s.replace(/<svg\b[^>]*>/i, tag => tag.replace(/\s(width|height)\s*=\s*("[^"]*"|'[^']*')/gi, ''));
  if (!/<svg\b[^>]*\sviewBox\s*=/i.test(s)) {
    throw new Error(`${file}: rot-taggen saknar viewBox, och då går ikonen inte att skala.`);
  }
  if (!/<svg\b[^>]*\saria-hidden\s*=/i.test(s)) {
    s = s.replace(/<svg\b/i, '<svg aria-hidden="true"');
  }
  return s
    .replace(/\s*\n\s*/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

const files = readdirSync(assetsDir)
  .filter(f => /\.svg$/i.test(f))
  .sort();
const lines = [];

for (const file of files) {
  const name = toName(file);
  const svg = clean(file, readFileSync(join(assetsDir, file), 'utf8'));
  lines.push(`export const ${name} = ${JSON.stringify(svg)};`);
}

const header = '// AUTOGENERERAD av scripts/generate-svgs.mjs. Redigera inte för hand.\n';
writeFileSync(outFile, header + (lines.length ? lines.join('\n') + '\n' : 'export {};\n'));
console.log(`Genererade ${lines.length} SVG-strängar till src/assets/svgs.generated.ts`);
