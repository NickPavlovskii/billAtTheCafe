import { describe, it, expect, beforeEach } from 'vitest'
import BillResult from '@/components/BillResult.vue'
import { mountWithGlobals } from '../helpers/mountWithGlobals'

const people = [
  { id: 1, name: 'Иван' },
  { id: 2, name: 'Мария' },
]

const positions = [
  { price: 100, people: [{ id: 1, name: 'Иван' }, { id: 2, name: 'Мария' }] },
  { price: 50, people: [{ id: 1, name: 'Иван' }] },
]

describe('BillResult.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mountWithGlobals(BillResult, {
      props: {
        people,
        positions,
        defaultTip: 10,
        currency: '₽',
      },
    })
  })

  it('рендерит участников и их доли', () => {
    const rows = wrapper.findAll('.table-row')
    expect(rows).toHaveLength(2)
    expect(rows[0].text()).toContain('Иван')
    expect(rows[1].text()).toContain('Мария')
    expect(wrapper.vm.personCosts[1]).toBeCloseTo(100)
    expect(wrapper.vm.personCosts[2]).toBeCloseTo(50)
  })

  it('корректно считает totalCost и totalWithTips', () => {
    expect(wrapper.vm.totalCost).toBeCloseTo(150)
    expect(wrapper.vm.totalWithTips).toBeCloseTo(165)
    expect(wrapper.vm.tipsAmount).toBeCloseTo(15)
  })

  it('корректно считает totalPaid из personPaid', async () => {
    await wrapper.setData({
      personPaid: { 1: '120', 2: '40' },
    })
    expect(wrapper.vm.totalPaid).toBeCloseTo(160)
  })

  it('показывает модалку если оплата меньше суммы с чаевыми', async () => {
    await wrapper.setData({
      personPaid: { 1: '50', 2: '50' },
    })
    expect(wrapper.vm.totalPaid).toBeLessThan(wrapper.vm.totalWithTips)

    await wrapper.findComponent({ name: 'BaseButton' }).trigger('click')

    expect(wrapper.vm.showModal).toBe(true)
    expect(wrapper.text()).toContain('Не хватает денег')
  })

  it('переключает экран на debts при достаточной оплате', async () => {
    await wrapper.setData({
      personPaid: { 1: '110', 2: '55' },
    })

    await wrapper.findComponent({ name: 'BaseButton' }).trigger('click')

    expect(wrapper.vm.currentScreen).toBe('debts')
    expect(wrapper.emitted('save-history')).toBeTruthy()
  })

  it('корректно вычисляет долги', async () => {
    await wrapper.setData({
      personPaid: { 1: '120', 2: '30' },
    })

    const debts = wrapper.vm.debts
    expect(debts.whoOwes).toEqual([
      { from: 'Мария', to: 'Иван', amount: '10.00' },
    ])
  })
})
