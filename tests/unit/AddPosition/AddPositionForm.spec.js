import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddPositionForm from '@/components/AddPosition/AddPositionForm.vue'
import PrimeVue from 'primevue/config'

const ReusableBtnStub = {
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    name: 'ReusableBtn',
}

describe('AddPositionForm.vue', () => {
    let wrapper

    const peopleMock = [
        { name: 'Alice', checked: false },
        { name: 'Bob', checked: false },
    ]

    const createComponent = (overrideProps = {}) => {
        return mount(AddPositionForm, {
            props: {
                people: [...peopleMock],
                ...overrideProps,
            },
            global: {
                plugins: [PrimeVue],
                stubs: {
                    'reusable-btn': ReusableBtnStub,
                },
            },
        })
    }

    beforeEach(() => {
        wrapper = createComponent()
    })

    it('рендерит поля ввода и аватары', () => {
        expect(wrapper.find('input[placeholder="Название"]').exists()).toBe(true)
        expect(wrapper.find('input[placeholder="Стоимость"]').exists()).toBe(true)
        // 1 аватар "Все" + 2 персонажа
        expect(wrapper.findAll('.avatar').length).toBe(3)
    })

    it('показывает модалку, если имя пустое', async () => {
        await wrapper.setData({ price: 100 })
        await wrapper.findComponent(ReusableBtnStub).trigger('click')

        expect(wrapper.vm.showModal).toBe(true)
        expect(wrapper.text()).toContain('Напишите название')
    })

    it('показывает модалку, если цена null', async () => {
        await wrapper.setData({ name: 'Пицца' })
        await wrapper.findComponent(ReusableBtnStub).trigger('click')

        expect(wrapper.vm.showModal).toBe(true)
        expect(wrapper.text()).toContain('Бесплатно?')
    })

    it('показывает модалку, если не выбраны люди', async () => {
        await wrapper.setData({ name: 'Пицца', price: 250 })
        await wrapper.findComponent(ReusableBtnStub).trigger('click')

        expect(wrapper.vm.showModal).toBe(true)
        expect(wrapper.text()).toContain('Выберите, кто ел')
    })

    it('эмитит событие add-position при валидной форме', async () => {
        await wrapper.setData({ name: 'Суп', price: 150 })
        wrapper.vm.people[0].checked = true

        await wrapper.findComponent(ReusableBtnStub).trigger('click')

        const emitted = wrapper.emitted('add-position')
        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toEqual({
            name: 'Суп',
            price: 150,
            people: [{ name: 'Alice', checked: false }],
        })
    })

    it('сбрасывает форму после успешного добавления', async () => {
        await wrapper.setData({ name: 'Салат', price: 120 })
        wrapper.vm.people[1].checked = true

        await wrapper.findComponent(ReusableBtnStub).trigger('click')

        expect(wrapper.vm.name).toBe('')
        expect(wrapper.vm.price).toBe(null)
        expect(wrapper.vm.people.every(p => p.checked === false)).toBe(true)
        expect(wrapper.vm.allSelected).toBe(false)
    })

    it('переключает выбор отдельного человека', async () => {
        const person = wrapper.vm.people[0]
        expect(person.checked).toBe(false)

        await wrapper.vm.togglePerson(person)
        expect(person.checked).toBe(true)

        await wrapper.vm.togglePerson(person)
        expect(person.checked).toBe(false)
    })

    it('выбирает и снимает выбор со всех', async () => {
        await wrapper.vm.toggleSelectAll()
        expect(wrapper.vm.people.every(p => p.checked)).toBe(true)
        expect(wrapper.vm.allSelected).toBe(true)

        await wrapper.vm.toggleSelectAll()
        expect(wrapper.vm.people.every(p => !p.checked)).toBe(true)
        expect(wrapper.vm.allSelected).toBe(false)
    })

    it('закрывает модалку по кнопке "Ок"', async () => {
        await wrapper.setData({ showModal: true })
        await wrapper.find('.ok-button').trigger('click')
        expect(wrapper.vm.showModal).toBe(false)
    })
})
