import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// import route components
import Admin from './views/Admin.vue'
import Home from './views/Home.vue'
import Header from './components/Header.vue'

// set routes
const routes = [
//   {path: '/', component: Home}
    {path: '/admin', component: Admin},
    {path: '/home', component: Home, Header},
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
