import BaseButton from './BaseButton.vue'
import IconButton from './IconButton.vue'
import BackButton from './BackButton.vue'
import BottomSheetModal from './BottomSheetModal.vue'

const components = [
  { name: 'base-btn', component: BaseButton },
  { name: 'icon-btn', component: IconButton },
  { name: 'back-btn', component: BackButton },
  { name: 'bottom-sheet', component: BottomSheetModal },
]

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  },
}
