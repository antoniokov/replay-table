import transformChangesTable from './csv/pointsTable';
import transformListOfMatches from './csv/listOfMatches';

export const transformers = {
    'pointsTable': transformChangesTable,
    'listOfMatches': transformListOfMatches
};

export function transform (transformer, data, params) {
    if(transformers.hasOwnProperty(transformer)) {
        return transformers[transformer](data, params);
    } else {
        return {
            status: 'error',
            errorMessage: `No transformer for transformer ${transformer}`
        }
    }
}