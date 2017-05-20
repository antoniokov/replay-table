import moduleConfig from './config';
import * as visualizersConfigs from './configs';
import initialize from '../configure/initialize';
import * as visualizers from './visualizers';


export default function (calculatedData, userConfig) {
    const params = initialize('visualizer', moduleConfig, visualizersConfigs, userConfig);
    return new visualizers[params.visualizer](calculatedData, params);
};
