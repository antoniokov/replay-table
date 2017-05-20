import * as calculators from './calculators';
import parametrize from '../configure/parametrize';
import config from './config';


export default function (transformedData, userConfig) {
    const params = parametrize(config, userConfig);

    const enriched = calculators.enrich(transformedData, params);
    const sorted = calculators.sort(enriched, params);
    const positioned = calculators.position(sorted, params);

    return calculators.addMeta(positioned, params);
};
