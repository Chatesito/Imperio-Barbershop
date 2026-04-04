import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Permite acceder desde cualquier dispositivo en tu red
    allowedHosts: [
      '.loca.lt', // Permite dominios de LocalTunnel
    ],
  },
})
