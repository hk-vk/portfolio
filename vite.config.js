import { resolve } from 'node:path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The hero's heading (Syne) and body text (Plus Jakarta Sans) are the first things painted. Preload
// their Latin files so the browser fetches them with the CSS instead of after it.
const preloadedFonts = [/^assets\/syne-latin-wght-normal-.+\.woff2$/, /^assets\/plus-jakarta-sans-latin-wght-normal-.+\.woff2$/];
const preloadHeroFonts = () => ({
  name: 'preload-hero-fonts',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: (_html, { bundle }) => preloadedFonts.map((pattern) => {
      const file = Object.keys(bundle ?? {}).find((name) => pattern.test(name));
      if (!file) throw new Error(`No font file matches ${pattern}`);
      return { tag: 'link', attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' }, injectTo: 'head' };
    }),
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
  plugins: [react(), preloadHeroFonts()],
  assetsInclude: ['**/*.glb', '**/*.png'],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.trycloudflare.com'],
    watch: {
      ignored: ['**/.archive-worktrees/**', '**/public/archive-builds/**'],
    },
  },
  // react-helmet-async is CommonJS with named imports, which Node can't load from the pre-render build.
  ssr: { noExternal: ['react-helmet-async'] },
  base: '/',
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        // The pre-render build (scripts/prerender.mjs) keeps its packages external, so it has none.
        manualChunks: isSsrBuild ? undefined : {
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
}));
