import * as extractors from '../extractors';
import getFileExtension from '../../helpers/general/get-file-extension';


export default function (source) {
    const extension = getFileExtension(source);
    return extractors.hasOwnProperty(extension) ? extension : null;
};
