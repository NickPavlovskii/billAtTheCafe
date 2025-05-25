import { mount } from '@vue/test-utils'
import Result from '@/components/BillResult.vue'

const people = [
    { id: 1, name: 'Иван' },
    { id: 2, name: 'Мария' },
]

const positions = [
    { price: 100, people: [people[0], people[1]] },
    { price: 50, people: [people[0]] },
]

describe('Result.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Result, {
            props: {
                people,
                positions,
                defaultTip: 10,
            },
        })
    })

    it('рендерит таблицу с людьми и их суммами', () => {
        const rows = wrapper.findAll('tbody tr')
        expect(rows).toHaveLength(2)

        expect(rows[0].text()).toContain('Иван')
        expect(rows[1].text()).toContain('Мария')

        // Проверим расчет personCosts для Ивана
        // Иван делит 100 на 2 + 50 = 50 + 50 = 100
        expect(wrapper.vm.personCosts[1]).toBeCloseTo(100)

        // Мария делит 100 на 2 = 50
        expect(wrapper.vm.personCosts[2]).toBeCloseTo(50)
    })

    it('корректно считает totalCost', () => {
        expect(wrapper.vm.totalCost).toBeCloseTo(150)
    })

    it('корректно считает totalPaid из personPaid', async () => {
        await wrapper.setData({
            personPaid: {
                1: '120',
                2: '40',
            },
        })

        expect(wrapper.vm.totalPaid).toBeCloseTo(160)
    })

    it('calculateTips рассчитывает чаевые', async () => {
        await wrapper.setData({
            personPaid: {
                1: '100',
                2: '50',
            },
        })
        // totalPaid = 150, defaultTip = 10%
        expect(wrapper.vm.calculateTips()).toBeCloseTo(15)
    })

    it('показывает модальное окно если totalCost > totalPaid при клике', async () => {
        await wrapper.setData({
            personPaid: {
                1: '50',
                2: '50',
            },
        })
        expect(wrapper.vm.totalPaid).toBeLessThan(wrapper.vm.totalCost)

        await wrapper.find('button').trigger('click')

        expect(wrapper.vm.showModal).toBe(true)
        expect(wrapper.find('.modal').exists()).toBe(true)
    })

    it('переключает экран на bill-list если totalCost <= totalPaid', async () => {
        await wrapper.setData({
            personPaid: {
                1: '100',
                2: '50',
            },
        })

        expect(wrapper.vm.totalPaid).toBeGreaterThanOrEqual(wrapper.vm.totalCost)

        await wrapper.find('button').trigger('click')

        expect(wrapper.vm.currentScreen).toBe('bill-list')
    })
    it('корректно вычисляет долги', async () => {
        await wrapper.setData({
            personPaid: {
                1: '120', // Иван заплатил больше на 20
                2: '30',  // Мария заплатила меньше на 20
            },
        })

        const debts = wrapper.vm.debts

        console.log('debts.whoIsOwed:', debts.whoIsOwed)
        console.log('debts.whoOwes:', debts.whoOwes)

        expect(debts.whoIsOwed).toEqual([
            { from: 'Иван', to: 'Мария', amount: '20.00' }
        ])

        expect(debts.whoOwes).toEqual([{ from: 'Иван', to: 'Мария', amount: '20.00' }])
    })


})
