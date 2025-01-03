import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
