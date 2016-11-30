export default {
    "default": {
        //input file format. For now only changesTable is supported. See an example: https://s3-us-west-2.amazonaws.com/replay-table/csv/football/england/premier-league/2015-2016.csv
        //String
        inputType: 'changesTable',

        //'Position', 'Rank',...
        //String
        positionName: '#',

        //'Team', 'Player', 'Driver',... When set to undefined gets name from data source if possible
        //String
        itemName: undefined,

        //focus on particular items (teams, players, drivers). ['Liverpool', 'Everton'], for example
        //Array of Strings
        focusedItems: [],

        //'Points', 'Wins',...
        //String
        totalName: 'Points',

        //['Australia', 'Bahrain',...] for F1, for example. When set to undefined gets names from data source if possible; if not uses round number
        //Array of Strings
        roundsNames: undefined,

        //number of round to start from. When set to undefined shows the last round
        //Number
        startFromRound: undefined,

        //animation duration in ms
        //Number
        animationDuration: 1800,

        //determines position when totals are equal. Can be 'no ties' (1, 2, 3, 4,...), 'highest' (1, 2, 2, 4,...) and 'range' (1, 2-3, 2-3, 4,...)
        //String
        tiesResolution: 'no ties',

        //resultName is used for color coding and animation. There are three options out of the box: 'victory', 'draw' or 'defeat'
        //Object: key — result, value — name
        resultName: {
            3: 'victory',
            1: 'draw',
            0: 'defeat'
        }
    },

    "F1": {
        itemName: 'Driver',
        resultName: {
            25: 'gold',
            18: 'silver',
            15: 'bronze'
        }
    },

    "ЧГК": {
        itemName: 'Команда',
        totalName: 'Взято',
        tiesResolution: 'range',
        resultName: {
            1: 'victory'
        }
    }
}