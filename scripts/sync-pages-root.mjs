import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(repoRoot, 'dist');
const rootAssetsDir = join(repoRoot, 'assets');

if (!existsSync(join(distDir, 'index.html'))) {
  throw new Error('Expected dist/index.html to exist before syncing Pages root files.');
}

rmSync(rootAssetsDir, { recursive: true, force: true });
mkdirSync(rootAssetsDir, { recursive: true });

cpSync(join(distDir, 'index.html'), join(repoRoot, 'index.html'));
cpSync(join(distDir, 'assets'), rootAssetsDir, { recursive: true });

if (existsSync(join(distDir, '.nojekyll'))) {
  cpSync(join(distDir, '.nojekyll'), join(repoRoot, '.nojekyll'));
}

console.log('Synced dist output to repository root for branch-based GitHub Pages.');
