import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // Specify the output directory
  },
  base: '/bike-rack-chicago-frontend',
  plugins: [react()],
});
