import { defineConfig, type Plugin } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const STATIC_CACHE_HEADERS = {
  'cache-control': 'public, max-age=31536000, immutable',
}

function ssrInlineCssPlugin(): Plugin {
  const virtualId = 'virtual:ssr-inline-css'
  const resolvedId = `\0${virtualId}`
  return {
    name: 'ssr-inline-css',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(this: { environment?: { name?: string } }, id: string, options?: { ssr?: boolean }) {
      if (id !== resolvedId) return
      const isSsr = Boolean(options?.ssr || this.environment?.name === 'ssr')
      if (isSsr) {
        return `import css from '/src/styles.css?inline';\nexport default css;`
      }
      return 'export default "";'
    },
  }
}

export default defineConfig({
  server: {
    port: 4000,
    allowedHosts: true,
  },
  // tanstackStart must come before viteReact
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    ssrInlineCssPlugin(),
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
