const path = require('path');

module.exports = {
    // ...existing code...
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src') // Ensure this alias is set
        }
    },
    devServer: {
        proxy: {
            '/xabber_auth_jwt': {
                target: 'https://your-api-server.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
};