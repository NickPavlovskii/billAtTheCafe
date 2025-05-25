import ReusableButton from '../components/global/ReusableButton.vue';

export default {
    title: 'Components/ReusableButton',
    component: ReusableButton,
    parameters: {
        docs: {
            description: {
                component: `
Гибкая кнопка с текстом и иконками, поддерживает отключение.

### Пропсы:

- \`text\` (_String_): Текст кнопки.
- \`leftIcon\` (_String_): CSS-класс для левой иконки (например, 'pi pi-plus').
- \`rightIcon\` (_String_): CSS-класс для правой иконки.
- \`disabled\` (_Boolean_): Если true — кнопка отключена (недоступна для кликов).

Компонент испускает событие \`click\` при нажатии (если не отключен).
        `,
            },
        },
    },
    argTypes: {
        text: {
            control: 'text',
            description: 'Текст кнопки',
        },
        leftIcon: {
            control: 'text',
            description: 'CSS-класс левой иконки (например, `pi pi-plus`)',
        },
        rightIcon: {
            control: 'text',
            description: 'CSS-класс правой иконки',
        },
        disabled: {
            control: 'boolean',
            description: 'Отключает кнопку',
        },
    },
};

const Template = (args) => ({
    components: { ReusableButton },
    setup() {
        return { args };
    },
    template: '<ReusableButton v-bind="args" @click="onClick" />',
    methods: {
        onClick: () => alert('ReusableButton clicked!'),
    },
});

export const Default = Template.bind({});
Default.args = {
    text: 'Добавить',
    leftIcon: 'pi pi-plus',
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Недоступно',
    leftIcon: 'pi pi-ban',
    disabled: true,
};
