import moduleConfig from './config';
import * as transformersConfig from './configs';
import initialize from '../configure/initialize'
import * as transformers from './transformers';
import * as postTransformers from './post-transformers';


export default function (rawData, userConfig) {
    const params = initialize('transformer', moduleConfig, transformersConfig, userConfig);

    const transformed = transformers[params.transformer](rawData, params);

    const filtered = params.filterItems.length > 0
        ? postTransformers.filterItems(transformed, params.filterItems)
        : transformed;

    const collapsed = params.collapseToRounds
        ? postTransformers.collapseToRounds(filtered)
        : filtered;

    return params.insertStartRound
        ? postTransformers.insertStartRound(collapsed, params.insertStartRound)
        : collapsed;
};
