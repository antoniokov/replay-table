import * as presets from '../presets';
import warn from '../../helpers/warn';


export default function (userPreset) {
    if (!userPreset) {
        return null;
    }

    if (!presets.hasOwnProperty(userPreset)) {
        warn(`No "${userPreset}" preset for now, sorry about that. Moving on with the default settings.`);
        return null;
    }

    return Object.keys(presets[userPreset])
        .reduce((obj, key) => Object.assign(obj, { [key]: Object.assign({}, presets[userPreset][key]) }) , {});
};
