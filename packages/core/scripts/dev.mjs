import { spawn } from 'node:child_process';

// Startar Stencils dev-server och Tailwinds watcher samtidigt i samma terminalfönster
const commands = ['npm run dev:stencil', 'npm run dev:styles'];

const children = commands.map(cmd => spawn(cmd, { shell: true, stdio: 'inherit' }));

// Om en av dem dör, stäng ner den andra så att inget ligger kvar i bakgrunden
for (const child of children) {
  child.on('exit', code => {
    for (const other of children) if (other !== child) other.kill();
    process.exit(code ?? 0);
  });
}
