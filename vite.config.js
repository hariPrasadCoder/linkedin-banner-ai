import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/luma': {
        target: 'https://agents.lumalabs.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/luma/, ''),
      },
      '/tmpfiles': {
        target: 'https://tmpfiles.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tmpfiles/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        },
      },
    },
  },
})
