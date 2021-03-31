const os = require('os')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: true,
  productionSourceMap: false,
  parallel: os.cpus().length > 1,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.optimization.runtimeChunk('single')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    open: false,
    overlay: {
      warning: false,
      error: true,
    },
    /* 跨域代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: process.env.VUE_APP_PROXY_BASE_API,
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
