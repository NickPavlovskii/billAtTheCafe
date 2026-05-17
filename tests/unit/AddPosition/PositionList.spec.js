import { describe, it, expect, beforeEach } from 'vitest'
import PositionList from '@/components/AddPosition/PositionList.vue'
import { mount } from '@vue/test-utils'

describe('PositionList.vue', () => {
  const mockPositions = [
    {
      name: 'Пицца',
      price: 500,
      people: [{ name: 'Иван' }, { name: 'Мария' }],
    },
    {
      name: 'Кофе',
      price: 150,
      people: [{ name: 'Алексей' }],
    },
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(PositionList, {
      props: { positions: mockPositions },
    })
  })

  it('отображает заголовок', () => {
    expect(wrapper.find('h3.title').text()).toBe('Список позиций:')
  })

  it('рендерит все позиции из props', () => {
    expect(wrapper.findAll('.position-item')).toHaveLength(mockPositions.length)
  })

  it('отображает имя и цену каждой позиции', () => {
    const firstItem = wrapper.findAll('.position-item')[0]
    expect(firstItem.text()).toContain('Пицца')
    expect(firstItem.text()).toContain('500')
    expect(firstItem.text()).toContain('₽')
  })

  it('рендерит мини-аватары участников', () => {
    const avatars = wrapper.findAll('.mini-avatar')
    const totalPeople = mockPositions.reduce((acc, pos) => acc + pos.people.length, 0)
    expect(avatars).toHaveLength(totalPeople)
    expect(avatars[0].text()).toBe('И')
  })

  it('вызывает remove-position при клике на удаление', async () => {
    await wrapper.find('.remove-button').trigger('click')
    expect(wrapper.emitted('remove-position')).toBeTruthy()
    expect(wrapper.emitted('remove-position')[0]).toEqual([0])
  })
})
