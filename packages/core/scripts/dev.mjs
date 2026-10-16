import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, watchFile } from 'node:fs';

// Startar Stencils dev-server och Tailwinds bevakning samtidigt i samma terminal.
const commands = ['npm run dev:stencil', 'npm run dev:styles'];

const children = commands.map(cmd => spawn(cmd, { shell: true, stdio: 'inherit' }));

// Tailwind skriver till .tailwind-build/, som Stencil aldrig rensar.
// Varje gång filen ändras kopierar vi den till www/, där dev-sidan läser den.
// Stencil rensar www/ vid start, men kopierar själv in filen då, så ordningen spelar ingen roll.
const source = '.tailwind-build/styles.css';
const target = 'www/styles.css';

watchFile(source, { interval: 300 }, () => {
  if (!existsSync(source)) return;
  mkdirSync('www', { recursive: true });
  copyFileSync(source, target);
});

// Om en av dem dör, stäng ner den andra så att inget ligger kvar i bakgrunden.
for (const child of children) {
  child.on('exit', code => {
    for (const other of children) if (other !== child) other.kill();
    process.exit(code ?? 0);
  });
}
