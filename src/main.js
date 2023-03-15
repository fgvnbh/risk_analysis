import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

import 'primevue/resources/primevue.min.css'            // core
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'  // theme
import 'primeicons/primeicons.css'                      // icons
import '/node_modules/primeflex/primeflex.css'


const app = createApp(App);
const pinia = createPinia()

app.use(PrimeVue);
app.use(router);
app.use(pinia);

app.mount('#app')
