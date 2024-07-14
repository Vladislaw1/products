import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/products/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve:{
    alias:{
      '@': '/src'
    }
  }
})
