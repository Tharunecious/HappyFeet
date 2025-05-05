import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  server:{
    host:true
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
      server: {port : 5173},
    },
  },
});
