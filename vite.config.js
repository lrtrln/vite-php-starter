import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const root = dirname(fileURLToPath(import.meta.url));
const hotFile = resolve(root, 'public/hot');

function hotFilePlugin(serverUrl) {
  const removeHotFile = () => {
    if (existsSync(hotFile)) rmSync(hotFile);
  };

  return {
    name: 'php-hot-file',
    configureServer(server) {
      removeHotFile();
      server.httpServer?.once('listening', () => {
        mkdirSync(dirname(hotFile), { recursive: true });
        writeFileSync(hotFile, serverUrl);
      });
      process.on('exit', removeHotFile);
      process.on('SIGINT', () => process.exit());
      process.on('SIGTERM', () => process.exit());
    },
    buildStart: removeHotFile,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, 'VITE_');
  const port = Number(env.VITE_PORT || 5173);
  const configuredHost = env.VITE_HOST || 'localhost';
  const host = configuredHost.startsWith('http')
    ? new URL(configuredHost).hostname
    : configuredHost;
  const serverUrl = `http://${host}:${port}`;

  return {
    base: './',
    publicDir: false,
    plugins: [tailwindcss(), hotFilePlugin(serverUrl)],
    server: {
      host: '0.0.0.0',
      port,
      strictPort: true,
      cors: true,
      origin: serverUrl,
      hmr: {
        host,
        protocol: 'ws',
        clientPort: port,
      },
    },
    build: {
      manifest: true,
      outDir: 'public/build',
      emptyOutDir: true,
      rollupOptions: {
        input: 'resources/js/app.js',
      },
    },
  };
});
