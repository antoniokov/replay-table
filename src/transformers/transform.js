import transformChangesTable from './csv/changesTable';
import transformMatchesList from './csv/matchesList';

export const transformers = {
    'changesTable': transformChangesTable,
    'matchesList': transformMatchesList
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