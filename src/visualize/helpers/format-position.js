export default function (position, positionWhenTied) {
    switch (positionWhenTied) {
        case 'strict':
            return position.strict.toString();
        case 'highest':
            return position.highest.toString();
        case 'range':
            if (position.highest !== position.lowest) {
                return `${position.highest}–${position.lowest}`;
            } else {
                return position.highest.toString();
            }
        case 'average':
            return ((position.highest + position.lowest) / 2).toString();
        default:
            return position.strict.toString();
    }
};
