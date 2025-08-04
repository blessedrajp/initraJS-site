import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // <-- This will resolve @/* aliases from tsconfig.json
  ],
  server: {
    port: 5173, // Optional: customize dev port
  },
  build: {
    outDir: 'dist', // Default output directory
  },
});
