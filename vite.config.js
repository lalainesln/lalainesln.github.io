import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const statsModule = fileURLToPath(
  new URL('./node_modules/three/examples/jsm/libs/stats.module.js', import.meta.url),
);

export default defineConfig({
  base: '/',
  root: 'src',
  publicDir: '../public',
  resolve: {
    alias: {
      'three/examples/jsm/libs/stats.module': statsModule,
    },
  },
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
