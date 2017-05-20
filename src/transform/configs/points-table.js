export default {
    extraColumnsNumber: {
        default: 0,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value)
    }
};
