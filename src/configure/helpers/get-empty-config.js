export default function (configs) {
    return Object.keys(configs).reduce((obj, module) => Object.assign(obj, { [module]: {} }), {});
};
