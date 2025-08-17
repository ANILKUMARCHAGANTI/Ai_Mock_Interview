import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Add this line to use relative paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
