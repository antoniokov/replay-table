export default {
    format: {
        default: 'csv',
        parse: input => input,
        validate: value => ['csv', 'football-data.org'].includes(value)
    },

    locationFirst: {
        default: 'home',
        parse: input => input,
        validate: value => ['home', 'away'].includes(value)
    },

    collapseToRounds: {
        default: false,
        parse: input => input === 'true',
        validate: value => typeof value === 'boolean'
    }
};
