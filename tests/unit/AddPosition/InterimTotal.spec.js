import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InterimTotal from '@/components/AddPosition/InterimTotal.vue'

describe('InterimTotal.vue', () => {
  it('корректно вычисляет и отображает сумму и чаевые', () => {
    const wrapper = mount(InterimTotal, {
      props: {
        positions: [
          { name: 'Пицца', price: 400 },
          { name: 'Кофе', price: 100 },
        ],
        defaultTip: 10,
      },
    })

    const values = wrapper.findAll('.interim-value')
    expect(values[0].text()).toContain('500.00')
    expect(values[1].text()).toContain('50.00')
    expect(wrapper.find('.interim-total-value').text()).toContain('550.00')
  })

  it('отображает 0 если передан пустой список позиций', () => {
    const wrapper = mount(InterimTotal, {
      props: {
        positions: [],
        defaultTip: 15,
      },
    })

    const values = wrapper.findAll('.interim-value')
    expect(values[0].text()).toContain('0.00')
    expect(values[1].text()).toContain('0.00')
    expect(wrapper.find('.interim-total-value').text()).toContain('0.00')
  })

  it('округляет чаевые до двух знаков после запятой', () => {
    const wrapper = mount(InterimTotal, {
      props: {
        positions: [{ name: 'Десерт', price: 333 }],
        defaultTip: 12,
      },
    })

    expect(wrapper.findAll('.interim-value')[1].text()).toContain('39.96')
  })
})
