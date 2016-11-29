export default {
    "default": {

        inputType: 'changesTable',

       //resultName is used for color coding. There are three options: 'victory', 'draw' or 'defeat'
       //default = 3: 'victory', 1: 'draw', 0: 'defeat'
       //Object: key — result, value — name
       resultName: {
            3: 'victory',
            1: 'draw',
            0: 'defeat'
        },

        //focus on particular items (teams, players)
        //default = empty Array
        //Array of Strings
        focusedItems: [],

        //animation duration in ms
        //default = 1800
        //Number
        animationDuration: 1800,

        //determines position when totals are equal. Can be 'no ties' (1, 2, 3, 4,...), 'highest' (1, 2, 2, 4,...) and 'range' (1, 2-3, 2-3, 4,...)
        //default = 'no ties'
        //String
        tiesResolution: 'no ties',

        //number of round to start from
        //default = undefined (show the last round)
        //Number
        startFromRound: undefined,

        //'Position', 'Rank',...
        //default = '#'
        //String
        positionName: '#',

        //'Team', 'Player', 'Driver',...
        //default = undefined (get from data source if possible)
        //String
        itemName: undefined,

        //'Points', 'Wins',...
        //default: 'Points'
        //String
        totalName: 'Points',

        //['Australia', 'Bahrain',...] for F1
        //default = undefined (get from data source if possible, if not use round number)
        //Array of Strings
        roundsNames: undefined
    },

    "soccer": {
        totalName: 'Pts'
    }
}