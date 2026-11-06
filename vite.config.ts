import { defineConfig, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'

// Form2Email only accepts browser posts from the registered production origin.
// In local dev, let Vite forward the request server-side (which the service allows).
const wishRelay: ProxyOptions = {
  target: 'https://form2email.terragohan.com',
  changeOrigin: true,
  rewrite: (path) =>
    path.replace(
      /^\/wish-relay/,
      '/f/U1_W96LtWjYAehp2AVp_0S_BOHqYmbq1V96yQdHyCOQ'
    ),
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.removeHeader('origin')
      proxyReq.removeHeader('referer')
    })
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/wish-relay': wishRelay,
    },
  },
  preview: {
    proxy: {
      '/wish-relay': wishRelay,
    },
  },
})
