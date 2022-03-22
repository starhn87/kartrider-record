const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.nexon.co.kr/kart/v1.0',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
