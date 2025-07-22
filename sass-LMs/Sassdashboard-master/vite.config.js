import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/lmsjuly12/',
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
})
