export default function(obj, validateKey = key => true, validateValue = value => true) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    const areKeysAvailable = Object.keys(obj).every(key => validateKey(key));
    const areTermsValid = Object.values(obj).every(value => validateValue(value));

    return areKeysAvailable && areTermsValid;
}