export default function (durations, speed) {
    return Object.keys(durations)
        .reduce((obj, key) => Object.assign(obj, { [key]: durations[key]/speed }), {})
};
