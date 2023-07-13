import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import store from './store/store'; 

import router from './router';





const app = createApp(App);

app.use(store); // Use the Vuex store
app.use(PrimeVue);
app.use(router);


app.mount('#app');
