import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ReusableButton from '@/components/global/ReusableButton.vue';

describe('ReusableButton.vue', () => {
    it('отображает переданный текст', () => {
        const wrapper = mount(ReusableButton, {
            props: {
                text: 'Сохранить',
            },
        });
        expect(wrapper.text()).toContain('Сохранить');
    });

    it('отображает левую и правую иконку, если заданы', () => {
        const wrapper = mount(ReusableButton, {
            props: {
                leftIcon: 'pi pi-plus',
                rightIcon: 'pi pi-check',
            },
        });

        const icons = wrapper.findAll('.button-icon-wrapper i');
        expect(icons).toHaveLength(2);
        expect(icons[0].classes()).toContain('pi-plus');
        expect(icons[1].classes()).toContain('pi-check');
    });

    it('не отображает иконки, если они не заданы', () => {
        const wrapper = mount(ReusableButton);
        expect(wrapper.find('.button-icon-wrapper').exists()).toBe(false);
    });

    it('вызывает событие click при нажатии', async () => {
        const wrapper = mount(ReusableButton);

        const button = wrapper.find('button');
        await button.trigger('click');

        expect(wrapper.emitted('click')).toBeTruthy();
    });
      

    it('блокирует кнопку, если disabled = true', () => {
        const wrapper = mount(ReusableButton, {
            props: {
                disabled: true,
            },
        });

        const button = wrapper.find('button');
        expect(button.attributes('disabled')).toBeDefined();
    });
});
