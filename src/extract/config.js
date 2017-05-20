import * as extractors from './extractors';
import isString from '../helpers/general/is-string';


export default {
    id: {
        default: '',
        parse: input => input,
        validate: isString
    },

    extractor: {
        default: 'csv',
        parse: input => input,
        validate: value => extractors.hasOwnProperty(value)
    },

    source: {
        default: undefined,
        parse: input => input,
        validate: isString
    }
};
