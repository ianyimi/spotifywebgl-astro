import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import auth from 'auth-astro';
import path from 'path';
import vercel from '@astrojs/vercel/serverless';
import { fileURLToPath } from 'url';
import glsl from 'vite-plugin-glsl';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), auth()],
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [glsl()],
    ssr: {
      noExternal: ['usehooks-ts', 'tailwindcss'],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
