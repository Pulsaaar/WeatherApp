import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from "tailwindcss"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  }
})
