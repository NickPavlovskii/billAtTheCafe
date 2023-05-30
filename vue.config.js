const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  // Other webpack configuration options...
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          // Additional Sass options if needed
        },
      },
    },
  },
};
const path = require('path');

module.exports = {
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          // Additional Sass options if needed
        },
      },
    },
  },

  // Other webpack configuration options...
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Replace 'src' with your actual source folder if different
      },
    },
  },
};
