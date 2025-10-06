import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/styles/variables.scss"; @import "/src/styles/mixins.scss";`,
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  test: {
    globals: true, // This enables global test, expect, describe, etc.
    environment: 'jsdom',
    setupFiles: './src/testUtils.tsx', // Optional: if you want to run this for all tests
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/testUtils.tsx',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
      ],
    },
  },
} as UserConfig);
