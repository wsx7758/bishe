module.exports = {   
  publicPath:'./',
  configureWebpack:(config)=>{
    config.entry.app = ['babel-polyfill', './src/main.js'];
  },
  transpileDependencies: ['swiper']
}; 