import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const archiveBuildFallback = () => ({
  name: 'archive-build-fallback',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      const pathname = request.url?.split('?')[0] || '';
      const archiveRoute = pathname.match(/^\/archive-builds\/([^/]+)(?:\/(.*))?$/);

      if (archiveRoute) {
        const [, snapshot, nestedPath = ''] = archiveRoute;
        const snapshotIndex = resolve(
          process.cwd(),
          'public',
          'archive-builds',
          snapshot,
          'index.html',
        );

        if (!existsSync(snapshotIndex)) {
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end('<p style="font-family:system-ui;padding:2rem">This archive build is still being prepared.</p>');
          return;
        }

        const lastSegment = nestedPath.split('/').at(-1) || '';
        const isStaticFile = lastSegment.includes('.');

        if (!isStaticFile) {
          request.url = request.url.replace(
            pathname,
            `/archive-builds/${snapshot}/index.html`,
          );
        }
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
  plugins: [react(), archiveBuildFallback()],
  assetsInclude: ['**/*.glb', '**/*.png'],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com'],
    watch: {
      ignored: ['**/.archive-worktrees/**', '**/public/archive-builds/**'],
    },
  },
  base: '/',
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and core libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Animation libraries in separate chunk
          animations: ['framer-motion'],
          // UI components chunk
          ui: ['@iconify/react'],
          // Utilities chunk
          utils: ['react-intersection-observer', 'react-markdown', 'remark-gfm']
        }
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset handling
    assetsInlineLimit: 4096,
    // Enable source maps for debugging but keep them external
    sourcemap: false,
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@iconify/react'] // This can be loaded on demand
  }
});
