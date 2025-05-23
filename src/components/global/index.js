import BaseButton from './BaseButton.vue'
import IconButton from './IconButton.vue'
import ReusableButton from './ReusableButton.vue'
const components = [
  { name: 'base-btn', component: BaseButton },
  { name: 'reusable-btn', component: ReusableButton },
  { name: 'icon-btn', component: IconButton }
]

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  },
}
