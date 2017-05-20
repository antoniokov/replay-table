import * as configs from './configs';
import getPresetConfig from './helpers/get-preset-config';
import getEmptyConfig from './helpers/get-empty-config';
import extendConfigs from './helpers/extend-configs';
import mapParamToModule from './helpers/map-param-to-module';
import addId from './helpers/add-id';
import toCamelCase from '../helpers/general/to-camel-case';
import warn from '../helpers/warn';


const reservedKeywords = ['preset'];

export default function (id, userConfig) {
    const config = getPresetConfig(userConfig.preset) || getEmptyConfig(configs);
    const extendedConfigs = extendConfigs(configs, config, userConfig);

    Object.keys(userConfig)
        .filter(param => !reservedKeywords.includes(param))
        .map(param => toCamelCase(param))
        .forEach(param => {
            const module = mapParamToModule(param, extendedConfigs);

            if (module) {
                config[module][param] = extendedConfigs[module][param].parse(userConfig[param]);
            } else {
                warn(`Sorry, there is no "${param}" parameter available. Ignoring it and moving on.`);
            }
        });

    return addId(id, config);
};
