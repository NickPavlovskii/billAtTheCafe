import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IconButton from '@/components/global/IconButton.vue'

describe('IconButton.vue', () => {
    it('renders the correct icon and aria-label', () => {
        const wrapper = mount(IconButton, {
            props: {
                icon: 'mdi:home',
                ariaLabel: 'Домой',
            },
        })

        const button = wrapper.find('button')
        expect(button.attributes('aria-label')).toBe('Домой')

        expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
    })

    it('emits click event when clicked', async () => {
        const wrapper = mount(IconButton, {
            props: {
                icon: 'mdi:home',
            },
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
    })

})
