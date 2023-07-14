import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import store from './store/store'; 

import router from './router';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS



const app = createApp(App);

app.use(store); // Use the Vuex store
app.use(PrimeVue);
app.use(router);


app.mount('#app');
