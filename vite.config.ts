import { defineConfig } from 'vite';
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
});
