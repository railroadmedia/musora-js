module.exports = {
    title: 'Musora.js',
    base: '/musora-js/',
    description: 'Musora.js is a collaborative initiative to create a cross-platform collection of javascript packages',
    evergreen: true,
    head: [
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i|Roboto+Condensed:400,400i,700,700i&display=swap' }]
    ],
    themeConfig: {
        displayAllHeaders: true,
        repo: 'railroadmedia/musora-js',
        nav: [
            {
                text: 'Guide',
                link: '/'
            },
            {
                text: 'Services',
                link: '/services/'
            },
            {
                text: 'Models',
                link: '/models/'
            },
        ],
        sidebar: 'auto',
        lastUpdated: 'Last Updated',
        algolia: {
            apiKey: '0cd1313cc322df6bfe4c5af28dc64620',
            indexName: 'musora-js'
        }
    },
};
