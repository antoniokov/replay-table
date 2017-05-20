import * as extractors from './extractors';
import guessExtractor from './helpers/guess-extractor';
import config from './config';
import crash from '../helpers/crash';
import warn from '../helpers/warn';


export default function (userConfig) {
    const source = config.source.validate(userConfig.source) && userConfig.source;

    if(!source) {
        crash(`Please, check the data source. We couldn't get anything out from ${userConfig.source}`);
        return;
    }

    const extractor = userConfig.extractor || guessExtractor(source);

    if (!config.extractor.validate(extractor)) {
        warn(`We couldn't determine the extractor so we'll try to use the default one, which is ${config.extractor.default}`);
        return extractors[config.extractor.default](source);
    }

    return extractors[extractor](source);
};
