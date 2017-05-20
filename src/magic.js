import configure from './configure/configure';
import extract from './extract/extract';
import transform from './transform/transform';
import calculate from './calculate/calculate';
import visualize from './visualize/visualize';

import crash from './helpers/crash';


export default function () {
    return Array.from(document.getElementsByClassName('replayTable'))
        .map(table => {
            const config = configure(table.id, table.dataset);

            return Promise.resolve(extract(config.extract))
                .then(raw => {
                    const transformed = transform(raw, config.transform);
                    const calculated = calculate(transformed, config.calculate);
                    return visualize(calculated, config.visualize);
                })
                .catch(error => crash(error));
        });
};
