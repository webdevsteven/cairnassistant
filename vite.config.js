import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/cairnassistant/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'Cairn Companion',
        short_name: 'Cairn',
        description: 'A mobile-first companion app for Cairn 2nd Edition RPG',
        theme_color: '#1c1917',
        background_color: '#0c0a09',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/cairnassistant/',
        scope: '/cairnassistant/',
        icons: [
          {
            src: '/cairnassistant/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/cairnassistant/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: []
      }
    })
  ]
})
