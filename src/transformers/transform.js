import transformChangesTable from './changesTable';

export const transformers = {
    'changesTable': transformChangesTable
};

export default function (inputType, data, params) {
    if(transformers.hasOwnProperty(inputType)) {
        return transformers[inputType](data, params);
    } else {
        return {
            status: 'error',
            errorMessage: `No transformer for inputType ${inputType}`
        }
    }
}