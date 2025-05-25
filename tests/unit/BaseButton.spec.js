import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/global/BaseButton.vue';

describe('BaseButton.vue', () => {
    it('отображает текст', () => {
        const wrapper = mount(BaseButton, {
            props: { text: 'Нажми меня' },
        });

        expect(wrapper.text()).toContain('Нажми меня');
    });

    it('испускает событие при клике', async () => {
        const wrapper = mount(BaseButton);
        await wrapper.trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click');
    });

    it('отображает левую и правую иконки', () => {
        const wrapper = mount(BaseButton, {
            props: {
                text: 'Тест',
                leftIcon: 'left.svg',
                rightIcon: 'right.svg',
            },
        });

        const images = wrapper.findAll('img');
        expect(images.length).toBe(2);
        expect(images[0].attributes('src')).toBe('left.svg');
        expect(images[1].attributes('src')).toBe('right.svg');
    });
});
