import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Setting base to relative matching for GitHub Pages
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})