const {i18n} = require('./next-i18next.config');

module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    i18n,
};
