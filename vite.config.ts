import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],

  server: {
    port: 3000,
    open: true, // Tự động mở browser
    host: true, // Cho phép truy cập từ network
  },

  preview: {
    port: 4173,
    open: true,
  },

  resolve: {
    alias: {
      src: "/src",
      "@": "/src",
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false, // Tắt sourcemap cho production
    rollupOptions: {
      output: {
        manualChunks: {
          // Tách vendor chunks để tối ưu caching
          react: ["react", "react-dom", "react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          antd: ["antd", "@ant-design/icons"],
          utils: ["lodash", "dayjs", "axios"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Tăng limit warning cho chunks lớn
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/_variables.scss" as *;`,
        api: "modern-compiler",
      },
    },
  },
});
