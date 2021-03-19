const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/auth',
    createProxyMiddleware({
        target: 'http://localhost:7000',
        changeOrigin: true,
    }));
};