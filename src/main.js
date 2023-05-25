import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'



// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


const app = createApp(App);

app.use(PrimeVue);



app.mount('#app');
