import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import auth from 'auth-astro';
import path from 'path';
import vercel from '@astrojs/vercel/serverless';
import { fileURLToPath } from 'url';
import glsl from 'vite-plugin-glsl';
import compress from 'astro-compress';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    auth(),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,
      logger: 1,
    }),
  ],
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
