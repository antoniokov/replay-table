import { transformers } from './transformers/transform';
import isString from './auxiliary/isString'

export const config = {
    //input file format. For now only pointsTable is supported. See an example: https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv
    //String
    transformer: {
        default: 'pointsTable',
        validate: value => transformers.hasOwnProperty(value)
    },

    //'Tournament', 'Saison' or a term of your choice.
    //String
    seasonName: {
        default: 'Season',
        validate: value => isString(value)
    },

    //'Game', 'Match', 'Round', 'Leg' or a term of your choice.
    //String
    roundName: {
        default: 'Game',
        validate: value => isString(value)
    },

    //'Position', 'Rank' or a term of your choice.
    //String
    positionName: {
        default: '#',
        validate: value => isString(value)
    },

    //'Team', 'Player', 'Driver' or a term of your choice. When undefined tries to get the name from data source.
    //String
    itemName: {
        default: undefined,
        validate: value => !value || isString(value)
    },

    //['Australia', 'Bahrain',...] for F1, for example. When set to undefined gets names from data source if possible; if not uses rounds numbers.
    //Comma-separated string
    roundsNames: {
        default: undefined,
        parse: input => input.split(','),
        validate: (value) => !value || (Array.isArray(value) && value.every(item => isString(item) || !Number.isNaN(item)))
    },

    //If defined inserts round #0 before all other rounds with all items having total equal to zero.
    //String or undefined
    startRoundName: {
        default: '0',
        validate: value => isString(value),
        goesToTransform: true
    },

    //'Points', 'Wins' or a term of your choice.
    //String
    totalName: {
        default: 'Points',
        validate: value => isString(value)
    },

    //Number of columns with extra data about items like city they represent or team they are part of. The columns should go after the items column and before the results columns.
    //Number
    extraColumnsNumber: {
        default: 0,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value),
        goesToTransform: true
    },

    //Add calculated columns like number of wins and losses
    //Object: key = calculated column, value = your term. Keys available: 'rounds', 'wins', 'losses', 'draws'
    calculatedColumns: {
        default: {},
        parse: input => JSON.parse(input),
        validate: obj => {
            if (!obj) {
                return true;
            } else if (typeof obj !== 'object') {
                return false;
            }

            const areKeysAvailable = Object.keys(obj).every(key => ['rounds', 'wins', 'losses', 'draws'].includes(key));
            const areTermsValid = Object.values(obj).every(value => isString(value));
            return areKeysAvailable && areTermsValid;
        }
    },

    //Specifies items that will be shown. When set to undefined shows all. This option is useful when there are teams from both conferences in results but you wan to display them in separate tables
    //Comma-separated string
    itemsToShow: {
        default: undefined,
        parse: input => input.split(','),
        validate: value => !value || (Array.isArray(value) && value.every(item => isString(item))),
        goesToTransform: true
    },

    //Focus on particular items (teams, players, drivers). "Liverpool,Everton" for example.
    //Comma-separated string
    focusedItems: {
        default: [],
        parse: input => input.split(','),
        validate: value => Array.isArray(value) && value.every(item => isString(item))
    },

    //Show change in total (+3, +1, ...) during the animation.
    //Boolean
    showChangeDuringAnimation: {
        default: false,
        parse: input => input === "true",
        validate: value => typeof value === 'boolean'
    },

    //Show or hide the progress bar.
    //Boolean
    showProgressBar: {
        default: true,
        parse: input => input === "true",
        validate: value => typeof value === 'boolean'
    },

    //Number of round to start from. When set to undefined shows the last round.
    //Number
    startFromRound: {
        default: undefined,
        parse: input => Number.parseInt(input, 10),
        validate: value => !value || !Number.isNaN(value)
    },

    //Animation duration in ms
    //Number
    animationDuration: {
        default: 1800,
        parse: input => Number.parseInt(input, 10),
        validate: value => !Number.isNaN(value)
    },

    //Determines position when totals are equal. Can be 'no ties' (1, 2, 3, 4,...), 'highest' (1, 2, 2, 4,...) and 'range' (1, 2-3, 2-3, 4,...)
    //String
    tieBreaking: {
        default: 'no ties',
        validate: value => ['no ties', 'highest', 'range'].includes(value),
        goesToTransform: true
    },


    //Name is required when you have several Replay Tables on one page.
    //String
    tableName: {
        default: undefined,
        validate: value => isString(value)
    },

    //resultMapping is used for color coding and animation. There are three options out of the box: 'win', 'draw' or 'loss'
    //Object: key — result, value — name
    resultMapping: {
        default: {
            3: 'win',
            1: 'draw',
            0: 'loss'
        },
        validate: value => false,
        goesToTransform: true
    }
};

export const presets = {
    "WinsLosses": {
        transformer: 'listOfMatches',
        itemName: 'Team',
        totalName: 'Win %',
        resultMapping: {
            1: 'win',
            0: 'loss'
        },
        calculatedColumns: {
            'rounds': 'Games',
            'wins': 'Wins',
            'losses': 'Losses'
        }
    },

    "F1": {
        roundName: 'Race',
        itemName: 'Driver',
        startRoundName: 'Start →'
    },

    "ЧГК": {
        seasonName: 'Турнир',
        roundName: 'Вопрос',
        itemName: 'Команда',
        totalName: 'Взято',
        tieBreaking: 'range',
        resultMapping: {
            1: 'win'
        }
    }
};