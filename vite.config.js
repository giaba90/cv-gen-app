import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_API_KEY: process.env.REACT_APP_API_KEY
    }
  }
});
