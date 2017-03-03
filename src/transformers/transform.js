import stableSort from '../helpers/stableSort';
import comparePositions from './helpers/comparePositions';
import calculatePositions from './helpers/calculatePositions';
import addRoundMetadata from './helpers/addRoundMetadata';

import transformChangesTable from './csv/pointsTable';
import transformListOfMatches from './csv/listOfMatches';

export const transformers = {
    'pointsTable': transformChangesTable,
    'listOfMatches': transformListOfMatches
};

export function transform (inputType, data, config) {
    if(transformers.hasOwnProperty(inputType)) {
        const resultObject = transformers[inputType](data, config);

        if(config.itemsToShow) {
            resultObject.resultsTable = resultObject.resultsTable
                .map(round => new Map([...round.entries()].filter(([item, result]) => config.itemsToShow.includes(item))))
        }

        resultObject.resultsTable = resultObject.resultsTable
            .map(round => new Map(stableSort([...round.entries()], comparePositions(config.tieBreaking))))
            .map(round => calculatePositions(round, config.positionWhenTied, config.tieBreaking))
            .map((round, i) => addRoundMetadata(round, resultObject.roundsNames[i], i));

        return resultObject;
    } else {
        return {
            status: 'error',
            errorMessage: `No input for input ${inputType}`
        }
    }
}