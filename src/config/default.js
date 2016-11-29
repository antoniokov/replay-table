//https://github.com/joshwcomeau/react-flip-move

//resultName is used for color coding. There are three options: 'victory', 'draw' or 'defeat'
//default = 3: 'victory', 1: 'draw', 0: 'defeat'
//Object: key — result, value — name
export const resultName = {
    3: 'victory',
    1: 'draw',
    0: 'defeat'
};

//focus on particular items (teams, players)
//default = empty Array
//Array of Strings
export const focusedItems = [];

//animation duration in ms
//default = 1800
//Number
export const animationDuration = 1800;

//determines position when totals are equal. Can be 'no ties' (1, 2, 3, 4,...), 'highest' (1, 2, 2, 4,...) and 'range' (1, 2-3, 2-3, 4,...)
//default = 'no ties'
//String
export const ties = 'no ties';

//number of round to start from
//default = undefined (show the last round)
//Number
export const startFrom = undefined;

//'Position', 'Rank',...
//default = '#'
//String
export const positionName = '#';

//'Team', 'Player', 'Driver',...
//default = undefined (get from data source if possible)
//String
export const itemName = undefined;

//'Points', 'Wins',...
//default = 'Points'
//String
export const totalName = 'Pts';

//['Australia', 'Bahrain',...] for F1
//default = undefined (get from data source if possible, if not use round #)
//Array of Strings
export const roundsNames = undefined;
