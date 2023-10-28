module.exports = {
  transpileDependencies: true,
  
  publicPath: process.env.NODE_ENV === 'production' ? '/tc2023/' : '/',
  
  devServer: {
    host: 'localhost',
    allowedHosts: ['kharels-macbook.local', 'localhost'],
    onBeforeSetupMiddleware: (server) => {
      server.app.use('/static', require('./middleware/serveCSS'));
    }
  },
  
  pluginOptions: {
    vuetify: {}
  }
};
