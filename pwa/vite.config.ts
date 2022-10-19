import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  
  plugins: [
    vue(),

    Unocss({
      rules: [['font-theme', { 'font-family': 'din-condensed, sans-serif' }]],
    }),

    VitePWA({
      strategies: 'generateSW',
    }),

    VitePluginFonts({
      typekit: {
        id: 'ghk7jyc', // Temp!
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})
