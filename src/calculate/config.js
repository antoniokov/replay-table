import calculations from './calculations';
import validateArray from '../helpers/validation/validate-array';
import isString from '../helpers/general/is-string';


export default {
    id: {
        default: '',
        parse: input => input,
        validate: isString
    },

    orderBy: {
        default: ['points'],
        parse: input => input.split(','),
        validate: value => validateArray(value, value => calculations.hasOwnProperty(value))
    }
};
