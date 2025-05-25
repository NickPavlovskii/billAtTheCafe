import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import GlobalComponents from './components/global/index'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css';        
import 'primeicons/primeicons.css';              
import 'primeflex/primeflex.css'; 

const app = createApp(App);

app.use(PrimeVue);
app.component('PrimeInputNumber', InputNumber)
app.component('PrimeDialog', Dialog)
app.component('PrimeDropdown', Dropdown)
app.component('PrimeButton', Button)
app.use(GlobalComponents)
app.mount('#app');



