module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/assets/scss/index.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}