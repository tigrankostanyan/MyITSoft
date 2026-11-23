import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const STATIC_CACHE_HEADERS = {
  'cache-control': 'public, max-age=31536000, immutable',
}

export default defineConfig({
  server: {
    port: 4000,
    allowedHosts: true,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'lenis'],
  },
  // tanstackStart must come before viteReact
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    nitro({
      compressPublicAssets: { gzip: true, brotli: true },
      prerender: {
        routes: ['/', '/contact'],
      },
      routeRules: {
        '/assets/**': { headers: STATIC_CACHE_HEADERS },
        '/images/**': { headers: STATIC_CACHE_HEADERS },
        '/models/**': { headers: STATIC_CACHE_HEADERS },
        '/myitsoft-logo.webp': { headers: STATIC_CACHE_HEADERS },
        '/myitsoft-logo.png': { headers: STATIC_CACHE_HEADERS },
        '/myitsoft-logo-icon.png': { headers: STATIC_CACHE_HEADERS },
      },
    }),
    viteReact(),
  ],
})
