export default function (obj) {
    return Object.keys(obj).reduce((result, key) => {
            const keyNumber = Number.parseInt(key, 10);
            const newValue = isNaN(keyNumber) ? key : keyNumber;
            const newKey = obj[key];
            return Object.assign(result, { [newKey]: newValue })
        }, {});
}