import * as extensions from '../extensions';


export default function (configs, presetConfig, userConfig) {
    return Object.keys(configs).map(module => {
        if (!extensions.hasOwnProperty(module)) {
            return {
                name: module,
                config: configs[module]
            };
        }

        const processorField = extensions[module].processorField;
        const processor = configs[module][processorField].validate(userConfig[processorField])
            ? userConfig[processorField]
            : presetConfig[module][processorField] || configs[module][processorField].default;

        const config = extensions[module].configs[processor]
            ? Object.assign({}, configs[module], extensions[module].configs[processor])
            : configs[module];

        return {
            name: module,
            config: config
        };
    }).reduce((extendedConfigs, elem) => Object.assign(extendedConfigs, { [elem.name]: elem.config }), {});
};
