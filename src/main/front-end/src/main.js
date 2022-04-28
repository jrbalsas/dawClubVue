import "bootstrap/dist/css/bootstrap.min.css"

//Choose component file format (only one)

//Support Vue JS and SFC components
import { createApp } from 'vue/dist/vue.esm-bundler'

//Support only Vue SFC components
//import { createApp } from 'vue'

import App from './AppClientes.vue'

createApp(App).mount('#app')
