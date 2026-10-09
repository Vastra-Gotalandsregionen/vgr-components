import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error(`Invalid version: "${version}". Expected x.y.z`);
  process.exit(1);
}

const core = '@vastra-gotalandsregionen/components-core';

for (const name of ['core', 'react', 'angular', 'vue']) {
  const file = new URL(`../packages/${name}/package.json`, import.meta.url);
  const pkg = JSON.parse(readFileSync(file, 'utf8'));
  pkg.version = version;
  if (name !== 'core' && pkg.dependencies?.[core]) {
    pkg.dependencies[core] = version;
  }
  writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`${name} -> ${version}`);
}