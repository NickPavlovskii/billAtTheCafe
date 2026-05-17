import { describe, it, expect, beforeEach } from 'vitest'
import AddPositionForm from '@/components/AddPosition/AddPositionForm.vue'
import { mountWithGlobals } from '../../helpers/mountWithGlobals'

describe('AddPositionForm.vue', () => {
  let wrapper

  const peopleMock = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]

  const createComponent = (overrideProps = {}) => mountWithGlobals(AddPositionForm, {
    props: {
      people: [...peopleMock],
      ...overrideProps,
    },
  })

  beforeEach(() => {
    wrapper = createComponent()
  })

  it('рендерит поля ввода и аватары', () => {
    expect(wrapper.find('input[placeholder="Название блюда..."]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Стоимость, руб."]').exists()).toBe(true)
    expect(wrapper.findAll('.avatar-chip').length).toBe(3)
  })

  it('показывает модалку, если имя пустое', async () => {
    await wrapper.setData({ priceRaw: '100' })
    await wrapper.find('.btn-add-position').trigger('click')

    expect(wrapper.vm.showModal).toBe(true)
    expect(wrapper.text()).toContain('Нет названия')
  })

  it('показывает модалку, если цена не указана', async () => {
    await wrapper.setData({ name: 'Пицца' })
    await wrapper.find('.btn-add-position').trigger('click')

    expect(wrapper.vm.showModal).toBe(true)
    expect(wrapper.text()).toContain('Укажите стоимость')
  })

  it('показывает модалку, если не выбраны люди', async () => {
    await wrapper.setData({ name: 'Пицца', priceRaw: '250' })
    await wrapper.find('.btn-add-position').trigger('click')

    expect(wrapper.vm.showModal).toBe(true)
    expect(wrapper.text()).toContain('Выберите участников')
  })

  it('эмитит событие add-position при валидной форме', async () => {
    await wrapper.setData({ name: 'Суп', priceRaw: '150' })
    wrapper.vm.localPeople[0].checked = true

    await wrapper.find('.btn-add-position').trigger('click')

    const emitted = wrapper.emitted('add-position')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toEqual({
      name: 'Суп',
      price: 150,
      people: [{ id: 1, name: 'Alice' }],
    })
  })

  it('сбрасывает форму после успешного добавления', async () => {
    await wrapper.setData({ name: 'Салат', priceRaw: '120' })
    wrapper.vm.localPeople[1].checked = true

    await wrapper.find('.btn-add-position').trigger('click')

    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.priceRaw).toBe('')
    expect(wrapper.vm.localPeople.every((p) => p.checked === false)).toBe(true)
    expect(wrapper.vm.allSelected).toBe(false)
  })

  it('переключает выбор отдельного человека', async () => {
    const person = wrapper.vm.localPeople[0]
    expect(person.checked).toBe(false)

    await wrapper.vm.togglePerson(person)
    expect(person.checked).toBe(true)

    await wrapper.vm.togglePerson(person)
    expect(person.checked).toBe(false)
  })

  it('выбирает и снимает выбор со всех', async () => {
    await wrapper.vm.toggleSelectAll()
    expect(wrapper.vm.localPeople.every((p) => p.checked)).toBe(true)
    expect(wrapper.vm.allSelected).toBe(true)

    await wrapper.vm.toggleSelectAll()
    expect(wrapper.vm.localPeople.every((p) => !p.checked)).toBe(true)
    expect(wrapper.vm.allSelected).toBe(false)
  })

  it('закрывает модалку по кнопке «Понятно»', async () => {
    await wrapper.setData({ showModal: true })
    await wrapper.find('.btn-modal-ok').trigger('click')
    expect(wrapper.vm.showModal).toBe(false)
  })
})
