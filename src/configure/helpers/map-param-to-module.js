export default function (param, configs) {
    const modules = Object.keys(configs)
        .filter(config => configs[config].hasOwnProperty(param));
    return modules.length > 0 ? modules[0] : null;
};
