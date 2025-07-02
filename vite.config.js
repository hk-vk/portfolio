import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.png'],
  server: {
    host: '0.0.0.0',
  },
  base: './',
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
