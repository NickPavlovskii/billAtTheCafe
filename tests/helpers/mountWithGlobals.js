import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import PrimeInputText from 'primevue/inputtext'
import GlobalComponents from '@/components/global/index'

export function mountWithGlobals(component, options = {}) {
  const { global: globalOptions = {}, ...rest } = options

  return mount(component, {
    ...rest,
    global: {
      plugins: [PrimeVue, GlobalComponents, ...(globalOptions.plugins || [])],
      components: {
        PrimeInputText,
        ...(globalOptions.components || {}),
      },
      stubs: globalOptions.stubs,
      mocks: globalOptions.mocks,
    },
  })
}
