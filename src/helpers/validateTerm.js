import isString from './isString';


export default function (term) {
    if (['startRound', 'item'].includes(term)) {
        return !term || isString(term);
    } else {
        return isString(term);
    }
}