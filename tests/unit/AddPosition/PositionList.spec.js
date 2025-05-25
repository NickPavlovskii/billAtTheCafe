import { mount } from '@vue/test-utils'
import PositionList from '@/components/AddPosition/PositionList.vue' // проверь путь
import Avatar from 'primevue/avatar'

describe('PositionList.vue', () => {
    const mockPositions = [
        {
            name: 'Пицца',
            price: 500,
            people: [
                { name: 'Иван', checked: true },
                { name: 'Мария', checked: false }
            ]
        },
        {
            name: 'Кофе',
            price: 150,
            people: [
                { name: 'Алексей', checked: true }
            ]
        }
    ]

    let wrapper

    beforeEach(() => {
        wrapper = mount(PositionList, {
            props: {
                positions: mockPositions
            },
            global: {
                components: { Avatar }
            }
        })
    })

    it('отображает заголовок', () => {
        expect(wrapper.find('h3.title').text()).toBe('Список позиций:')
    })

    it('рендерит все позиции из props', () => {
        const items = wrapper.findAll('.position-item')
        expect(items).toHaveLength(mockPositions.length)
    })

    it('отображает имя и цену каждой позиции', () => {
        const firstItem = wrapper.findAll('.position-item')[0]
        expect(firstItem.text()).toContain('Пицца')
        expect(firstItem.text()).toContain('500 руб.')
    })

    it('рендерит аватары для каждой позиции', () => {
        const avatars = wrapper.findAllComponents(Avatar)
        const totalPeople = mockPositions.reduce((acc, pos) => acc + pos.people.length, 0)
        expect(avatars).toHaveLength(totalPeople)
    })

    it('рендерит аватар с первой буквой имени', () => {
        const avatar = wrapper.findComponent(Avatar)
        expect(avatar.props('label')).toBe('И')
    })

    it('вызывает событие remove-position при клике на иконку удаления', async () => {
        const removeBtn = wrapper.find('.remove-button')
        await removeBtn.trigger('click')
        expect(wrapper.emitted('remove-position')).toBeTruthy()
        expect(wrapper.emitted('remove-position')[0]).toEqual([0])
    })

    it('присваивает класс "avatar-active" только выбранным людям', () => {
        const avatarEls = wrapper.findAll('.avatar')
        const hasActive = avatarEls.some(el => el.classes().includes('avatar-active'))
        expect(hasActive).toBe(true)
    })
})
