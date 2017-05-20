import validateArray from '../../helpers/validation/validate-array';
import isString from '../../helpers/general/is-string';
import * as controls from '../controls';
import parseObject from '../../helpers/parsing/parse-object';
import validateObject from '../../helpers/validation/validate-object';

export default {
    controls: {
        default: ['play'],
        parse: input => input.split(','),
        validate: value => validateArray(value, value => controls.hasOwnProperty(value))
    },

    durations: {
        default: {
            move: 1000,
            freeze: 500,
            pre: 750
        },
        parse: parseObject,
        validate: obj => validateObject(obj,
            key => ['move', 'freeze', 'pre'].includes(key),
            value => !Number.isNaN(value) && value >= 0)
    },

    colors: {
        default: {
            'win': '#21c114',
            'draw': '#828282',
            'loss': '#e63131'
        },
        parse: parseObject,
        validate: obj => validateObject(obj,
            key => ['win', 'draw', 'loss'].includes(key),
            value => isString(value))
    },

    sparkColors: {
        default: {
            'win': '#D7E7C1', //#A8C968
            'draw': '#F0F0F0', //#C2C2C2
            'loss': '#EFCEBA' //#D78B68
        },
        parse: parseObject,
        validate: obj => validateObject(obj,
            key => ['win', 'draw', 'loss'].includes(key),
            value => isString(value))
    },

    currentSparkColors: {
        default: {
            'win': '#AAD579',
            'draw': '#CCCCCC',
            'loss': '#E89B77'
        },
        parse: parseObject,
        validate: obj => validateObject(obj,
            key => ['win', 'draw', 'loss'].includes(key),
            value => isString(value))
    },

    pointsLabel: {
        default: 'points',
        parse: input => input,
        validate: isString
    },

    allLabel: {
        default: 'All',
        parse: input => input,
        validate: isString
    }
};
