export default function (obj) {
    return Object.keys(obj).reduce((result, key) => {
            const value = obj[key];
            return Object.assign(result, { [value]: key })
        }, {});
}