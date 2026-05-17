import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BottomSheetModal from '@/components/global/BottomSheetModal.vue'

describe('BottomSheetModal.vue', () => {
  it('не рендерится при show=false', () => {
    const wrapper = mount(BottomSheetModal, {
      props: { show: false, title: 'Тест' },
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('показывает заголовок и текст', () => {
    const wrapper = mount(BottomSheetModal, {
      props: {
        show: true,
        icon: 'mdi:alert',
        title: 'Заголовок',
        text: 'Описание',
      },
    })

    expect(wrapper.find('.modal-title').text()).toBe('Заголовок')
    expect(wrapper.find('.modal-text').text()).toBe('Описание')
  })

  it('закрывается по клику на оверлей', async () => {
    const wrapper = mount(BottomSheetModal, {
      props: { show: true, title: 'Тест' },
    })

    await wrapper.find('.modal-overlay').trigger('click.self')
    expect(wrapper.emitted('update:show')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('рендерит слоты default и footer', () => {
    const wrapper = mount(BottomSheetModal, {
      props: { show: true },
      slots: {
        default: '<p class="custom-body">Тело</p>',
        footer: '<button class="custom-btn">Ок</button>',
      },
    })

    expect(wrapper.find('.custom-body').text()).toBe('Тело')
    expect(wrapper.find('.custom-btn').exists()).toBe(true)
    expect(wrapper.find('.modal-title').exists()).toBe(false)
  })
})
