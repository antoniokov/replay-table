export default function (number, zeroString = '') {
    if (number > 0) {
        return `+${number}`;
    } else if (number < 0) {
        return number.toString();
    } else {
        return zeroString;
    }
};
