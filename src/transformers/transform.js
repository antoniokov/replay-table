import stableSort from '../auxiliary/stableSort';
import calculatePositions from './auxiliary/calculatePositions';
import addRoundMetadata from './auxiliary/addRoundMetadata';

import transformChangesTable from './csv/pointsTable';
import transformListOfMatches from './csv/listOfMatches';

export const transformers = {
    'pointsTable': transformChangesTable,
    'listOfMatches': transformListOfMatches
};

export function transform (input, data, config) {
    if(transformers.hasOwnProperty(input)) {
        const resultObject = transformers[input](data, config);

        if(config.itemsToShow) {
            resultObject.resultsTable = resultObject.resultsTable
                .map(round => new Map([...round.entries()].filter(([item, result]) => config.itemsToShow.includes(item))))
        }

        resultObject.resultsTable = resultObject.resultsTable
            .map(round => new Map(stableSort([...round.entries()], (a,b) => b[1].total - a[1].total)))
            .map(round => calculatePositions(round, config.positionWhenTied))
            .map((round, i) => addRoundMetadata(round, resultObject.roundsNames[i], i));

        return resultObject;
    } else {
        return {
            status: 'error',
            errorMessage: `No input for input ${input}`
        }
    }
}