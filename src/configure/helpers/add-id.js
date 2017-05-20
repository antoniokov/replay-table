export default function (id, config) {
    return Object.keys(config).reduce((obj, module) => {
        const moduleConfig = Object.assign({ id: id }, config[module]);
        return Object.assign(obj, { [module]: moduleConfig });
    }, {});
};
