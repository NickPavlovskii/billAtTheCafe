/** @type { import('@storybook/vue3-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {}
  },
  docs: {
    autodocs: true,
  }
};

export default config;
