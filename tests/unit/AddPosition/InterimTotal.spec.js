import { mount } from '@vue/test-utils'
import InterimTotal from '@/components/AddPosition/InterimTotal.vue'

describe('InterimTotal.vue', () => {
    it('корректно вычисляет и отображает сумму и чаевые', () => {
        const wrapper = mount(InterimTotal, {
            props: {
                positions: [
                    { name: 'Пицца', price: 400 },
                    { name: 'Кофе', price: 100 }
                ],
                defaultTip: 10
            }
        })

        const output = wrapper.find('.itog').text()
        expect(output).toBe('500 руб. (+ 50.00 руб. чаевых)')
    })

    it('отображает 0 если передан пустой список позиций', () => {
        const wrapper = mount(InterimTotal, {
            props: {
                positions: [],
                defaultTip: 15
            }
        })

        const output = wrapper.find('.itog').text()
        expect(output).toBe('0 руб. (+ 0.00 руб. чаевых)')
    })

    it('округляет чаевые до двух знаков после запятой', () => {
        const wrapper = mount(InterimTotal, {
            props: {
                positions: [
                    { name: 'Десерт', price: 333 }
                ],
                defaultTip: 12
            }
        })

        const output = wrapper.find('.itog').text()
        // 333 * 0.12 = 39.96
        expect(output).toContain('333 руб. (+ 39.96 руб. чаевых)')
    })
})
