export default function (number, isChange = false, precision = 3) {
    if (number === null || typeof number !== 'number') {
        return '';
    }

    let result;

    if (Number.isInteger(number)) {
        result = number.toString()
    } else {
        result = number.toFixed(precision).toString();
    }

    if (isChange && number > 0) {
        result = `+${result}`;
    }

    if (Math.abs(number) > 0 && Math.abs(number) < 1) {
        result = result.replace('0.', '.');
    }

    return result;
}