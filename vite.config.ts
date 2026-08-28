import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "variables" as *; @use "mixins" as *;`,
        loadPaths: [path.resolve(import.meta.dirname, './src/styles')],
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
})
