module.exports = {
    appName: 'Wee Demo',
    purgeCss: {
        paths: [
            'server/views/**/*.njk',
            'source/components/**/*.vue'
        ],
    },
    server: {
        proxy: 'http://localhost:3000',
    },
};
