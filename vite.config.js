import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    // Bind to loopback only. Do NOT set `host: true` unless you intend
    // to expose the dev server to your whole network.
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: '127.0.0.1',
    port: 4173,
  },

  build: {
    target: 'es2020',
    outDir: 'dist',
    // Source maps ship the full, unminified original source and hand
    // anyone a clean copy of your code. Keep them off for production.
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Deterministic hashed names; no build paths in filenames.
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  esbuild: {
    sourcemap: false,
  },
})
