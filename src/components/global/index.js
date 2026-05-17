import BaseButton from './BaseButton.vue'
import IconButton from './IconButton.vue'
import BackButton from './BackButton.vue'

const components = [
  { name: 'base-btn', component: BaseButton },
  { name: 'icon-btn', component: IconButton },
  { name: 'back-btn', component: BackButton },
]

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  },
}
