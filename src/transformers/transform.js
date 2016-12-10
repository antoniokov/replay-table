import transformChangesTable from './csv/pointsTable';
import transformListOfMatches from './csv/listOfMatches';

export const transformers = {
    'pointsTable': transformChangesTable,
    'listOfMatches': transformListOfMatches
};

export function transform (input, data, params) {
    if(transformers.hasOwnProperty(input)) {
        return transformers[input](data, params);
    } else {
        return {
            status: 'error',
            errorMessage: `No input for input ${input}`
        }
    }
}