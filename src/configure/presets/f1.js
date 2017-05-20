export default {
    extract: {},
    transform: {
        transformer: 'pointsTable',
        changeToOutcome: {
            25: 'win'
        },
        insertStartRound: 'Start →'
    },
    calculate: {
        orderBy: ['points', 'wins']
    },
    visualize: {
        columns: ['position', 'item', 'points', 'points.change'],
        labels: ['#', 'Driver', 'Points']
    }
};
