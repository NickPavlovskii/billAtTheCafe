import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import store from './store/store'; 


// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


const app = createApp(App);

app.use(store); // Use the Vuex store
app.use(PrimeVue);



app.mount('#app');
