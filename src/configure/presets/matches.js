export default {
    extract: {},
    transform: {
        transformer: 'listOfMatches',
        collapseToRounds: false
    },
    calculate: {
        orderBy: ['points', 'goalsDifference', 'goalsFor']
    },
    visualize: {
        columns: ['position', 'item', 'points', 'outcome', 'match'],
        labels: ['#', 'Team', 'Points']
    }
};
