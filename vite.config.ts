import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ViteDevServer } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'configure-response-headers',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: any, res: any, next: any) => {
        // Set cache headers for specific assets
        if (req.url?.match(/\/(assets\/logo_mini\.webp|assets\/preview_3\.webp)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
          res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
        }
        next();
      });
    }
  }],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  // Configure headers for production build
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Add query parameter for cache busting when content changes
          if (assetInfo.name?.match(/\.(webp|png|jpg|jpeg)$/)) {
            return '[name].[hash].[ext]';
          }
          return '[name].[ext]';
        },
      },
    },
  },
})
