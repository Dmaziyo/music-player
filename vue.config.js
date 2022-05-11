
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/styles/var.less'),
        resolve('src/styles/mixin.less')
      ]
    }
  }
}
