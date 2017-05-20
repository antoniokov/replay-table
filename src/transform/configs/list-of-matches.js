export default {
    locationFirst: {
        default: 'home',
        parse: input => input,
        validate: value => ['home', 'away'].includes(value)
    },

    collapseToRounds: {
        default: true,
        parse: input => input === 'true',
        validate: value => typeof value === 'boolean'
    }
};
