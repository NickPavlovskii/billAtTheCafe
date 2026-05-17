import { describe, it, expect, beforeEach } from 'vitest'
import AddPerson from '@/components/AddPerson.vue'
import { mountWithGlobals } from '../helpers/mountWithGlobals'

describe('AddPerson.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mountWithGlobals(AddPerson, {
      props: { people: [] },
    })
  })

  it('рендерит заголовок секции', () => {
    expect(wrapper.text()).toContain('Участники')
    expect(wrapper.text()).toContain('Добавьте минимум 2 человека')
  })

  it('показывает пустое состояние, если список людей пуст', () => {
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('Здесь пока никого нет')
  })

  it('скрывает пустое состояние, если есть участники', async () => {
    await wrapper.setProps({
      people: [{ id: 1, name: 'Иван' }],
    })
    expect(wrapper.find('.empty-state').exists()).toBe(false)
    expect(wrapper.find('.person-card').exists()).toBe(true)
  })

  it('ввод имени обновляет newPersonName', async () => {
    const input = wrapper.find('input')
    await input.setValue('Мария')
    expect(wrapper.vm.newPersonName).toBe('Мария')
  })

  it('эмитит add-people при добавлении', async () => {
    await wrapper.setProps({ people: [{ id: 1, name: 'Иван' }] })
    await wrapper.find('input').setValue('Мария')
    await wrapper.find('.btn-add').trigger('click')

    expect(wrapper.emitted('add-people')).toBeTruthy()
    const emittedPayload = wrapper.emitted('add-people')[0][0]
    expect(emittedPayload).toHaveLength(2)
    expect(emittedPayload.some((p) => p.name === 'Мария')).toBe(true)
  })

  it('очищает поле ввода после добавления', async () => {
    await wrapper.find('input').setValue('Мария')
    await wrapper.find('.btn-add').trigger('click')
    expect(wrapper.vm.newPersonName).toBe('')
  })

  it('эмитит delete-person при удалении', async () => {
    const person = { id: 1, name: 'Иван' }
    await wrapper.setProps({ people: [person] })
    await wrapper.find('.delete-btn').trigger('click')

    expect(wrapper.emitted('delete-person')).toBeTruthy()
    expect(wrapper.emitted('delete-person')[0][0]).toEqual(person)
  })
})
