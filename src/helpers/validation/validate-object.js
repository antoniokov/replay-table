export default function (obj, validateKey = (key => true), validateValue = (value => true)) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    const areKeysValid = Object.keys(obj).every(key => validateKey(key));
    const areValuesValid = Object.values(obj).every(value => validateValue(value));

    return areKeysValid && areValuesValid;
};
