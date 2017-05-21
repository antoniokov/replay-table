export default {
    extract: {},
    transform: {
        transformer: 'listOfMatches',
        collapseToRounds: false
    },
    calculate: {},
    visualize: {
        columns: ['position', 'item', 'points', 'outcome', 'match'],
        labels: ['#', 'Team', 'Points']
    }
};
