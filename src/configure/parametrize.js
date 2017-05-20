import warn from '../helpers/warn';


export default function (config, userConfig) {
    Object.keys(userConfig).filter(param => !config.hasOwnProperty(param))
        .forEach(param => warn(`Sorry, there is no "${param}" parameter available. Ignoring it and moving on.`));

    const params = Object.keys(config).reduce((obj, param) => Object.assign(obj, { [param]: config[param].default }), {});

    Object.keys(userConfig)
        .filter(param => config.hasOwnProperty(param))
        .forEach(param => {
            if (config[param].validate(userConfig[param])) {
                params[param] = userConfig[param];
            } else if (userConfig[param] !== undefined) {
                warn(`Sorry, we cannot accept ${userConfig[param]} as ${param}. \
                Moving on with the default value, which is ${params[param]}.`);
            }
        });

    return params;
};
