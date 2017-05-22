import validateArray from '../../helpers/validation/validate-array';
import isString from '../../helpers/general/is-string';
import parseObject from '../../helpers/parsing/parse-object';
import validateObject from '../../helpers/validation/validate-object';

export default {
    columns: {
        default: ['position', 'item', 'points'],
        parse: input => input.split(','),
        validate: value => validateArray(value, isString)
    },

    labels: {
        default: ['#', 'Team', 'Points'],
        parse: input => input.split(','),
        validate: value => validateArray(value, isString)
    },

    colors: {
        default: {
            'win': '#ACE680',
            'draw': '#B3B3B3',
            'loss': '#E68080'
        },
        parse: parseObject,
        validate: obj => validateObject(obj,
            key => ['win', 'draw', 'loss'].includes(key),
            value => isString(value))
    },

    durations: {
        default: {
            move: 750,
            freeze: 750,
            outcomes: 200
        },
        parse: parseObject,
        validate: obj => validateObject(obj,
            key => ['move', 'freeze', 'outcomes'].includes(key),
            value => !Number.isNaN(value) && value >= 0)
    }
};
