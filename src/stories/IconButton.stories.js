import IconButton from '../components/global/IconButton.vue';

export default {
    title: 'Components/IconButton',
    component: IconButton,
    parameters: {
        docs: {
            description: {
                component: `
Кнопка с иконкой, созданная для быстрого взаимодействия. Поддерживает динамическую иконку, кастомные цвета и доступность.

### Пропсы:

- \`icon\` (_String_, required): Название иконки из Iconify (например: 'mdi:help-circle-outline').
- \`iconColor\` (_String_): Цвет иконки. По умолчанию 'white'.
- \`backgroundColor\` (_String_): Фоновый цвет кнопки. По умолчанию '#026bb5'.
- \`backgroundColorHover\` (_String_): Цвет фона при наведении. По умолчанию '#035fa1'.
- \`ariaLabel\` (_String_): Текст для экранных читалок, улучшает доступность.
        `,
            },
        },
    },
    argTypes: {
        icon: {
            control: 'text',
            description: 'Название иконки (поддержка Iconify, например: mdi:home)',
        },
        iconColor: {
            control: 'color',
            description: 'Цвет иконки (по умолчанию: white)',
        },
        backgroundColor: {
            control: 'color',
            description: 'Фоновый цвет кнопки',
        },
        backgroundColorHover: {
            control: 'color',
            description: 'Фоновый цвет при наведении',
        },
        ariaLabel: {
            control: 'text',
            description: 'Текст для экранных читалок (улучшает доступность)',
        },
    },
};

const Template = (args) => ({
    components: { IconButton },
    setup() {
        return { args };
    },
    template: '<IconButton v-bind="args" @click="onClick" />',
    methods: {
        onClick: () => alert('IconButton clicked!'),
    },
});

export const Default = Template.bind({});
Default.args = {
    icon: 'mdi:help-circle-outline',
    iconColor: '#ffffff',
    backgroundColor: '#026bb5',
    backgroundColorHover: '#014b8d',
    ariaLabel: 'Помощь',
};
