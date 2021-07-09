var webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: "dist",
  assetsDir: "./static",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9002',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins:
      [new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })]

  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack: config => {
    config.entry('main').add('babel-polyfill')
    config.module
      .rule('image')
      .test(/\.ico$/)
      .use('url-loader')
      .loader('url-loader')
  },
  css: {
    sourceMap: true
  },
}