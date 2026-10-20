import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(repoRoot, 'public', 'cad');

function packageRoot(name) {
  let dir = dirname(require.resolve(name));
  while (dir !== dirname(dir)) {
    const manifestPath = join(dir, 'package.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      if (manifest.name === name) return dir;
    }
    dir = dirname(dir);
  }
  throw new Error(`Could not locate package root for ${name}`);
}

const files = [
  [
    join(packageRoot('@mlightcad/libredwg-converter'), 'dist', 'libredwg-parser-worker.js'),
    'libredwg-parser-worker.js',
  ],
  [
    join(packageRoot('@mlightcad/libredwg-converter'), 'dist', 'libredwg-web.wasm'),
    'libredwg-web.wasm',
  ],
  [
    join(packageRoot('@mlightcad/mtext-renderer'), 'dist', 'mtext-renderer-worker.js'),
    'mtext-renderer-worker.js',
  ],
];

mkdirSync(outDir, { recursive: true });
for (const [source, name] of files) {
  if (!existsSync(source)) {
    throw new Error(`Missing CAD asset: ${source}`);
  }
  copyFileSync(source, join(outDir, name));
  console.log(`copied ${name}`);
}
