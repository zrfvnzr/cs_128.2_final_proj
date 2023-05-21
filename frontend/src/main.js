import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// import route components
import Admin from './views/Admin.vue'
import Login from './views/Login.vue'
import Predictor from './views/Predictor.vue'

// set routes
const routes = [
//   {path: '/', component: Home}
    {path: '/admin', component: Admin},
    {path: '/login', component: Login},
    {path: '/predictor', component: Predictor}
]

const router = createRouter({
  history: createWebHistory(), routes
})
app.use(router)
// end Vue Router

// Vue Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)
// end Vue Axios

app.mount('#app')
