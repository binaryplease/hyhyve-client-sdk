import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'example',
  build: {
    outDir: '../example-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'example/index.html'),
        jwtAuth: resolve(__dirname, 'example/jwt-auth-example.html')
      }
    }
  },
  base: './'
})