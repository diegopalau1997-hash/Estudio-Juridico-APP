import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.estudiojapp.com.ar',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
