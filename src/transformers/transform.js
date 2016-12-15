import stableSort from '../auxiliary/stableSort';
import calculatePositions from './auxiliary/calculatePositions';

import transformChangesTable from './csv/pointsTable';
import transformListOfMatches from './csv/listOfMatches';

export const transformers = {
    'pointsTable': transformChangesTable,
    'listOfMatches': transformListOfMatches
};

export function transform (input, data, params) {
    if(transformers.hasOwnProperty(input)) {
        const resultObject = transformers[input](data, params);

        if(params['itemsToShow']) {
            resultObject.results = resultObject.results
                .map(round => new Map([...round.entries()].filter(([item, result]) => params['itemsToShow'].includes(item))))
        }

        resultObject.results = resultObject.results
            .map(round => new Map(stableSort([...round.entries()], (a,b) => b[1].total - a[1].total)))
            .map(round => calculatePositions(round, params['positionWhenTied']));

        return resultObject;
    } else {
        return {
            status: 'error',
            errorMessage: `No input for input ${input}`
        }
    }
}