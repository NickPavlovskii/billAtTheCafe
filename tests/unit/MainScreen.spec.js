import { mount } from '@vue/test-utils'
import MainScreen from '@/components/MainScreen.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import BaseBtn from '@/components/global/BaseButton.vue'
import IconBtn from '@/components/global/IconButton.vue'
import { nextTick } from 'vue'
import PrimeVue from 'primevue/config'

describe('MainScreen.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(MainScreen, {
            global: {
                plugins: [PrimeVue],
                components: { Dialog, Button, BaseBtn, IconBtn },
            },
        })
    })

    it('рендерит заголовок', () => {
        expect(wrapper.text()).toContain('Добро пожаловать в Cafe Bill Splitter')
    })

    it('показывает модальное окно при клике на кнопку с иконкой', async () => {
        const iconBtn = wrapper.findComponent(IconBtn)

        await iconBtn.trigger('click')
        expect(wrapper.vm.showModal).toBe(true)

    })

    it('закрывает модальное окно при клике по затемнению', async () => {
        // открыть модалку
        wrapper.vm.showModal = true
        await nextTick()

        const dialog = wrapper.findComponent(Dialog)
        await dialog.trigger('click.self')

        expect(wrapper.vm.showModal).toBe(true)
    })

    it('закрывает модальное окно при клике на кнопку "Закрыть"', async () => {
        wrapper.vm.showModal = true
        await nextTick()

        const closeButton = wrapper.findComponent(Button)
        await closeButton.trigger('click')

        expect(wrapper.vm.showModal).toBe(false)
    })

    it('испускает событие "start" при клике на кнопку "Начать"', async () => {
        const baseBtn = wrapper.findComponent(BaseBtn)
        await baseBtn.trigger('click')

        expect(wrapper.emitted('start')).toBeTruthy()
    })
})
