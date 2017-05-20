import * as visualizers from './visualizers';
import * as controls from './controls';
import isString from '../helpers/general/is-string';
import parseObject from '../helpers/parsing/parse-object';
import validateObject from '../helpers/validation/validate-object';
import validateArray from '../helpers/validation/validate-array';


export default {
    id: {
        default: '',
        parse: input => input,
        validate: isString
    },

    visualizer: {
        default: 'classic',
        parse: input => input,
        validate: value => visualizers.hasOwnProperty(value)
    },

    startFromRound: {
        default: null,
        parse: input => Number.parseInt(input, 10),
        validate: value => !value || !Number.isNaN(value)
    },

    roundsTotalNumber: {
        default: null,
        parse: input => Number.parseInt(input, 10) || undefined,
        validate: value => !value || !Number.isNaN(value)
    },

    positionWhenTied: {
        default: 'strict',
        parse: input => input,
        validate: value => ['strict', 'highest', 'range', 'average'].includes(value)
    },

    controls: {
        default: ['play', 'previous', 'next', 'slider'],
        parse: input => input.split(','),
        validate: value => validateArray(value, value => controls.hasOwnProperty(value))
    },

    speed: {
        default: 1.0,
        parse: Number.parseFloat,
        validate: value => !Number.isNaN(value) && value > 0.0 && value <= 10.0
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
