import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002,
  },
  resolve: {
    alias: {
      // Simplified alias that doesn't require 'path' or '__dirname'
      '@': '/src',
    },
  },
})
