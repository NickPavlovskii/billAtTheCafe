import { reactive } from 'vue'

export const billResultStore = reactive({
  subScreen: 'result',
  requestBack() {
    if (this.subScreen === 'debts') {
      this.subScreen = 'result'
      return false
    }
    return true
  },
})
