import BaseButton from '../components/global/BaseButton.vue';

export default {
    title: 'Components/BaseButton',
    component: BaseButton,
    parameters: {
        docs: {
            description: {
                component: `
Базовая кнопка с текстом и опциональными иконками слева и справа.

### Пропсы:

- \`text\` (_String_): Текст, отображаемый внутри кнопки.
- \`leftIcon\` (_String_): URL-адрес иконки слева от текста (например: 'icons/arrow-left-white.svg').
- \`rightIcon\` (_String_): URL-адрес иконки справа от текста (например: 'icons/arrow-right-white.svg').

Компонент испускает событие \`click\` при нажатии.
        `,
            },
        },
    },
    argTypes: {
        text: {
            control: 'text',
            description: 'Текст на кнопке',
        },
        leftIcon: {
            control: 'text',
            description: 'URL иконки, отображаемой слева от текста',
        },
        rightIcon: {
            control: 'text',
            description: 'URL иконки, отображаемой справа от текста',
        },
    },
};

const Template = (args) => ({
    components: { BaseButton },
    setup() {
        return { args };
    },
    template: '<BaseButton v-bind="args" @click="onClick" />',
    methods: {
        onClick: () => alert('BaseButton clicked!'),
    },
});

export const Default = Template.bind({});
Default.args = {
    text: 'Нажми меня',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    text: 'С иконками',
    leftIcon: 'icons/arrow-left-white.svg',
    rightIcon: 'icons/arrow-right-white.svg',
};
