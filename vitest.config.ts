import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts'],
    alias: {
      'astro:content': new URL('./src/__mocks__/astro-content.ts', import.meta.url).pathname,
    },
  },
});
