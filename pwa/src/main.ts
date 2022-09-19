import { App as VueApp, createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

const app: VueApp = createApp(App)

app.mount('#app')
