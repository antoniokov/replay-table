import { transformers } from '../transformers/transform';
import isString from '../helpers/isString';
import parseObject from '../helpers/parseObject';
import validateObject from '../helpers/validateObject';
import validateTerm from '../helpers/validateTerm';


//https://github.com/TargetProcess/replayTable#parameters
export default {
    //Terms
    terms: {
        default: {
            season: 'Season',
            round: 'Round',
            position: '#',
            item: 'Team',
            total: 'Points',
            changes: 'Changes',
            change: 'Change'
        },
        parse: input => parseObject(input),
        validate: value => validateObject(value, key => ['season', 'changes', 'round', 'startRound',
            'position', 'item', 'total'].includes(key), value => validateTerm(value))
    },

    //Backward compatibility
    seasonName: {
        default: 'Season',
        parse: input => input,
        validate: value => isString(value),
        deprecated: true
    },

    changesName: {
        default: 'Changes',
        parse: input => input,
        validate: value => isString(value),
        deprecated: true
    },

    roundName: {
        default: 'Round',
        parse: input => input,
        validate: value => isString(value),
        deprecated: true
    },

    startRoundName: {
        default: '0',
        parse: input => input === "undefined" ? undefined : input,
        validate: value => !value || isString(value),
        deprecated: true
    },

    positionName: {
        default: '#',
        parse: input => input,
        validate: value => isString(value),
        deprecated: true
    },

    itemName: {
        default: 'Team',
        parse: input => input === "undefined" ? undefined : input,
        validate: value => !value || isString(value),
        deprecated: true
    },

    totalName: {
        default: 'Points',
        parse: input => input,
        validate: value => isString(value),
        deprecated: true
    },


    //Data

    inputType: {
        default: 'listOfMatches',
        parse: input => input,
        validate: value => transformers.hasOwnProperty(value)
    },

    addStartRound: {
        default: '0',
        parse: input => input === "undefined" ? undefined : input,
        validate: value => !value || isString(value)
    },

    itemsToShow: {
        default: undefined,
        parse: input => input === "undefined" ? undefined : input.split(','),
        validate: value => !value || (Array.isArray(value) && value.every(item => isString(item)))
    },

    totalValue: {
        default: 'cumulative',
        parse: input => input,
        validate: value => ['cumulative', 'win %'].includes(value)
    },

    resultMapping: {
        default: {
            3: 'win',
            1: 'draw',
            0: 'loss'
        },
        parse: input => parseObject(input),
        validate: obj => validateObject(obj, key => !Number.isNaN(key), value => ['win', 'draw', 'loss'].includes(value))
    },

    extraColumnsNumber: {
        default: 0,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value)
    },

    calculatedColumns: {
        default: {},
        parse: input => parseObject(input),
        validate: obj => validateObject(obj, key => ['rounds', 'wins', 'losses', 'draws',
                'goalsFor', 'goalsAgainst', 'goalsDifference', 'rating'].includes(key), value => isString(value))
    },

    useRoundsNumbers: {
        default: false,
        parse: input => input === 'true',
        validate: value => typeof value === 'boolean'
    },

    roundsTotalNumber: {
        default: undefined,
        parse: input => Number.parseInt(input, 10),
        validate: value => value === undefined || !Number.isNaN(value)
    },

    tieBreaking: {
        default: [],
        parse: input => input.split(','),
        validate: value => Array.isArray(value) &&
            value.every(item => ['rounds', 'wins', 'losses', 'draws',
                'goalsFor', 'goalsAgainst', 'goalsDifference', 'rating'].includes(item))
    },

    positionWhenTied: {
        default: 'previous round',
        parse: input => input,
        validate: value => ['previous round', 'highest', 'range'].includes(value)
    },

    locationFirst: {
        default: 'home',
        parse: input => input,
        validate: value => ['home', 'away'].includes(value)
    },

    tableName: {
        default: undefined,
        parse: input => input === "undefined" ? undefined : input,
        validate: value => isString(value)
    },


    //Playback

    modes: {
        default: undefined,
        parse: input => input.split(','),
        validate: value => Array.isArray(value) && value.length > 0 &&
            value.every(item => ['season', 'round', 'matches', 'item'].includes(item))
    },

    startFromRound: {
        default: undefined,
        parse: input => input === "undefined" ? undefined : Number.parseInt(input, 10),
        validate: value => !value || !Number.isNaN(value)
    },

    animationDuration: {
        default: 1800,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value)
    },

    showChangeDuringAnimation: {
        default: false,
        parse: input => input === "true",
        validate: value => typeof value === 'boolean'
    },


    //Appearance

    showProgressBar: {
        default: true,
        parse: input => input === "true",
        validate: value => typeof value === 'boolean'
    },

    focusedItems: {
        default: [],
        parse: input => input.split(','),
        validate: value => Array.isArray(value) && value.every(item => isString(item))
    },

    roundColorCoding: {
        default: undefined,
        parse: input => input,
        validate: value => !value || ['rating'].includes(value)
    }
};
