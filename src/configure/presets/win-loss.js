export default {
    extract: {},
    transform: {
        transformer: 'listOfMatches',
        changeToOutcome: {
            1: 'win',
            0: 'loss'
        }
    },
    calculate: {
        orderBy: ['winningPercentage', 'wins']
    },
    visualize: {
        visualizer: 'classic',
        columns: ['position', 'item', 'rounds', 'wins', 'losses', 'winningPercentage', 'outcome', 'match'],
        labels: ['#', 'Team', 'G', 'W' , 'L', 'Win %']
    }
};
