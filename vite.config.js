import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = 9090;

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: port
  },
  server: {
    port: port
  }
});
