import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  //Change with App context path (default /)
  //base: '/club-1.0/',

  //Deploy into JakartaEE web app
  build: {
    //outDir: '../webapp'
  }
})
