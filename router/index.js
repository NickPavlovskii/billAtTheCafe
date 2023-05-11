import Vue from 'vue'
import VueRouter from 'vue-router'
import AddPerson from '../components/AddPerson.vue'
import AddPosition from '../components/AddPosition.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/add-person',
    name: 'AddPerson',
    component: AddPerson
  },
  {
    path: '/add-position',
    name: 'AddPosition',
    component: AddPosition
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
