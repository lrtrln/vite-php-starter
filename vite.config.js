import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.VITE_PORT || 5173);
const host = process.env.VITE_HOST || 'localhost';
const hotFile = resolve(root, 'public/hot');

function hotFilePlugin() {
  const removeHotFile = () => {
    if (existsSync(hotFile)) rmSync(hotFile);
  };

  return {
    name: 'php-hot-file',
    configureServer(server) {
      removeHotFile();
      server.httpServer?.once('listening', () => {
        mkdirSync(dirname(hotFile), { recursive: true });
        writeFileSync(hotFile, `http://${host}:${port}`);
      });
      process.on('exit', removeHotFile);
      process.on('SIGINT', () => process.exit());
      process.on('SIGTERM', () => process.exit());
    },
    buildStart: removeHotFile,
  };
}

export default defineConfig({
  plugins: [tailwindcss(), hotFilePlugin()],
  server: {
    host: '0.0.0.0',
    port,
    strictPort: true,
    cors: true,
    origin: `http://${host}:${port}`,
  },
  build: {
    manifest: true,
    outDir: 'public/build',
    emptyOutDir: true,
    rollupOptions: {
      input: 'resources/js/app.js',
    },
  },
});
