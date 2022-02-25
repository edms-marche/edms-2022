/**
 * 參考：https://medium.com/js-dojo/vuejs-pwa-cache-busting-8d09edd22a31
 */
const manifestJSON = require('./public/manifest.json')

module.exports = {
  /**
   * pass options to @vue/cli-plugin-pwa，參考：https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {
    name: manifestJSON.short_name,
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js'
    },
  },

  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: '/file-agent/',
  
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader'),
    // adjust the warning threshold of 244K
    config.performance
      .maxEntrypointSize(1024000)
      .maxAssetSize(1024000)
  },

  // 打包时不生成 .map 文件
  productionSourceMap: false,

  // 取消 [mini-css-extract-plugin] warning Conflicting order
  css: {
    extract: {
      ignoreOrder: true 
    },
  }
}