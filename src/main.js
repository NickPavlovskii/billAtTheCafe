import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import GlobalComponents from './components/global/index'
import InputText from 'primevue/inputtext'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './styles/theme.css'
import './styles/mobile.css'
import './styles/desktop.css'

const savedTheme = localStorage.getItem('theme') || 'auto'
if (savedTheme === 'auto') {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.body.className = prefersDark ? 'dark-theme' : 'light-theme'
} else {
  document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme'
}

const app = createApp(App)

app.use(PrimeVue);
app.component('PrimeInputText', InputText)
app.use(GlobalComponents)
app.mount('#app')

