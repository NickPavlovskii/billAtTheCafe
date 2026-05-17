import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import MainScreen from '@/components/MainScreen.vue'
import { mountWithGlobals } from '../helpers/mountWithGlobals'

describe('MainScreen.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mountWithGlobals(MainScreen, {
      props: {
        hasDraft: false,
        recentSessions: [],
      },
    })
  })

  it('рендерит заголовок приложения', () => {
    expect(wrapper.text()).toContain('Cafe')
    expect(wrapper.text()).toContain('Bill Splitter')
  })

  it('показывает модалку инструкции', async () => {
    await wrapper.find('.btn-hint').trigger('click')
    expect(wrapper.vm.showModal).toBe(true)
    expect(wrapper.text()).toContain('Как это работает')
  })

  it('закрывает модалку по кнопке «Понятно, начнём!»', async () => {
    wrapper.vm.showModal = true
    await nextTick()

    await wrapper.find('.btn-primary').trigger('click')
    expect(wrapper.vm.showModal).toBe(false)
  })

  it('испускает start при клике «Начать»', async () => {
    await wrapper.find('.btn-secondary').trigger('click')
    expect(wrapper.emitted('start')).toBeTruthy()
  })

  it('показывает кнопку продолжения при черновике', async () => {
    await wrapper.setProps({ hasDraft: true })
    expect(wrapper.text()).toContain('Продолжить текущий счёт')
    expect(wrapper.text()).toContain('Начать заново')
  })

  it('испускает continue-draft', async () => {
    await wrapper.setProps({ hasDraft: true })
    await wrapper.find('.btn-primary').trigger('click')
    expect(wrapper.emitted('continue-draft')).toBeTruthy()
  })
})
