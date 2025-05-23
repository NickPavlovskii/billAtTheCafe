import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import GlobalComponents from './components/global/index'
const app = createApp(App);

app.use(PrimeVue);
app.use(GlobalComponents)
app.mount('#app');
