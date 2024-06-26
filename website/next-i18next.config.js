module.exports = {
    debug: false,
    i18n: {
        defaultLocale: 'ua',
        locales: ['ua', 'en'],
        localeDetection: false,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};
