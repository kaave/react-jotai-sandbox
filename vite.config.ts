/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    // globals でないと挙動が怪しいテストがいくつかある。 AsyncCounter など。
    globals: true,
    // happy-dom は input[type="text"] に対する fireEvent.change の挙動がおかしい。
    // environment: 'happy-dom',
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    // setupFiles: './src/test/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    exclude: ['node_modules/**/*'],
  },
});
