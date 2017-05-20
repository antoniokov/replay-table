import parametrize from './parametrize';


export default function (processorField, moduleConfig, processorsConfigs, userConfig) {
    const processor = parametrize({ [processorField]: moduleConfig[processorField] },
                                  { [processorField]: userConfig[processorField]})[processorField];


    const config = processorsConfigs.hasOwnProperty(processor)
        ? Object.assign({}, moduleConfig, processorsConfigs[processor])
        : moduleConfig;

    return parametrize(config, userConfig);
};
