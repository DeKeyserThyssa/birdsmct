import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    APP_URL: 'http://127.0.0.1:5173',
    FIREBASE_EMULATION_URL: 'http://127.0.0.1:9099',

    USER: 'Edward Hopper',
    EMAIL: 'adward@howest.be',
    PASSWORD: 'ILoveBirds123',
  }
})