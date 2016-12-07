import { transformers } from './transformers/transform';
import isString from './auxiliary/isString'

export const config = {
    "default": {
        //input file format. For now only changesTable is supported. See an example: https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv
        //String
        transformer: 'changesTable',

        //'Tournament', 'Saison' or a term of your choice.
        //String
        seasonName: 'Season',

        //'Game', 'Match', 'Round', 'Leg' or a term of your choice.
        //String
        roundName: 'Game',

        //'Position', 'Rank' or a term of your choice.
        //String
        positionName: '#',

        //'Team', 'Player', 'Driver' or a term of your choice. When undefined tries to get the name from data source.
        //String
        itemName: undefined,

        //['Australia', 'Bahrain',...] for F1, for example. When set to undefined gets names from data source if possible; if not uses rounds numbers.
        //Array of Strings or Numbers
        roundsNames: undefined,

        //If defined inserts round #0 before all other rounds with all items having total equal to zero.
        //String or undefined
        startRoundName: '0',

        //'Points', 'Wins' or a term of your choice.
        //String
        totalName: 'Points',

        //Number of columns with extra data about items like city they represent or team they are part of. The columns should go after the items column and before the results columns.
        //Number
        extraColumnsNumber: 0,

        //Focus on particular items (teams, players, drivers). ['Liverpool', 'Everton'], for example.
        //Array of Strings
        focusedItems: [],

        //Show change in total (+3, +1, ...) during the animation.
        //Boolean
        showChangeDuringAnimation: false,

        //Show or hide the progress bar.
        //Boolean
        showProgressBar: true,

        //Number of round to start from. When set to undefined shows the last round.
        //Number
        startFromRound: undefined,

        //Animation duration in ms
        //Number
        animationDuration: 1800,

        //Determines position when totals are equal. Can be 'no ties' (1, 2, 3, 4,...), 'highest' (1, 2, 2, 4,...) and 'range' (1, 2-3, 2-3, 4,...)
        //String
        tieBreaking: 'no ties',


        //Name is required when you have several Replay Tables on one page.
        //String
        tableName: undefined,

        //resultName is used for color coding and animation. There are three options out of the box: 'victory', 'draw' or 'defeat'
        //Object: key — result, value — name
        resultName: {
            3: 'victory',
            1: 'draw',
            0: 'defeat'
        }
    },

    "WinsLosses": {
        itemName: 'Team',
        totalName: 'Wins %',
        resultName: {
            1: 'victory',
            0: 'defeat'
        }
    },

    "F1": {
        roundName: 'Race',
        itemName: 'Driver',
        startRoundName: 'Start →',
        resultName: {}
    },

    "ЧГК": {
        seasonName: 'Турнир',
        roundName: 'Вопрос',
        itemName: 'Команда',
        totalName: 'Взято',
        tieBreaking: 'range',
        resultName: {
            1: 'victory'
        }
    }
};

export function isParameterValid (parameterName, parameterValue) {
    switch (parameterName) {
        case 'transformer':
            return transformers.hasOwnProperty(parameterValue);

        case 'seasonName':
            return isString(parameterValue);

        case 'roundName':
            return isString(parameterValue);

        case 'positionName':
            return isString(parameterValue);

        case 'itemName':
            return !parameterValue || isString(parameterValue);

        case 'roundsNames':
            return !parameterValue || (Array.isArray(parameterValue) && parameterValue.every(item => isString(item) || !Number.isNaN(item)));

        case 'startRoundName':
            return isString(parameterValue);

        case 'totalName':
            return isString(parameterValue);

        case 'extraColumnsNumber':
            return !Number.isNaN(parameterValue);

        case 'focusedItems':
            return Array.isArray(parameterValue) && parameterValue.every(item => isString(item));

        case 'showChangeDuringAnimation':
            return typeof parameterValue === 'boolean';

        case 'showProgressBar':
            return typeof parameterValue === 'boolean';

        case 'startFromRound':
            return !parameterValue || !Number.isNaN(parameterValue);

        case 'animationDuration':
            return !Number.isNaN(parameterValue);

        case 'tieBreaking':
            return ['no ties', 'highest', 'range'].includes(parameterValue);

        case 'tableName':
            return isString(parameterValue);

        default:
            return false;
    }
}