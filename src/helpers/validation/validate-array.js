export default function (arr, validateElement = (elem => true)) {
    if (!Array.isArray(arr)) {
        return false;
    }

    return arr.every(elem => validateElement(elem));
};
