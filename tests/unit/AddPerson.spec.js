import { mount } from '@vue/test-utils'
import AddPerson from '@/components/AddPerson.vue'
import PrimeVue from 'primevue/config'

describe('AddPerson.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(AddPerson, {
            global: {
                plugins: [PrimeVue],
            },
            props: {
                people: [],
            },
        })
    })


    it('рендерит заголовок', () => {
        expect(wrapper.text()).toContain('Добавить человека')
    })

    it('показывает сообщение, если список людей пуст', () => {
        expect(wrapper.find('.add-someone-text').exists()).toBe(true)
        expect(wrapper.find('.add-someone-text').text()).toContain('Добавим кого-нибудь!')
    })

    it('не показывает сообщение, если список людей не пуст', async () => {
        await wrapper.setProps({
            people: [{ id: 1, name: 'Иван' }],
        })
        expect(wrapper.find('.add-someone-text').exists()).toBe(false)
    })

    it('ввод имени обновляет модель newPerson.name', async () => {
        const input = wrapper.find('input')
        await input.setValue('Мария')
        expect(wrapper.vm.newPerson.name).toBe('Мария')
    })

    it('при добавлении нового человека эмитит событие "add-people" с обновлённым списком', async () => {
        await wrapper.setProps({ people: [{ id: 1, name: 'Иван' }] })
        await wrapper.find('input').setValue('Мария')

        await wrapper.vm.addPerson()

        expect(wrapper.emitted('add-people')).toBeTruthy()
        const emittedPayload = wrapper.emitted('add-people')[0][0]
        expect(emittedPayload.length).toBe(2)
        expect(emittedPayload.some(p => p.name === 'Мария')).toBe(true)
    })

    it('очищает поле ввода после добавления человека', async () => {
        await wrapper.find('input').setValue('Мария')
        await wrapper.vm.addPerson()
        expect(wrapper.vm.newPerson.name).toBe('')
    })

    it('при клике на иконку удаления эмитит событие "delete-person"', async () => {
        await wrapper.setProps({ people: [{ id: 1, name: 'Иван' }] })
        const deleteIcon = wrapper.find('.person-delete-icon')
        await deleteIcon.trigger('click')

        expect(wrapper.emitted('delete-person')).toBeTruthy()
        expect(wrapper.emitted('delete-person')[0][0]).toEqual({ id: 1, name: 'Иван' })
    })

    it('isInputActive меняется на true при фокусе на input и на false при blur', async () => {
        const input = wrapper.find('input')
        await input.trigger('focus')
        expect(wrapper.vm.isInputActive).toBe(true)
        await input.trigger('blur')
        expect(wrapper.vm.isInputActive).toBe(false)
    })
})

