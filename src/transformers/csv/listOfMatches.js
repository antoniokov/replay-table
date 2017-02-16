import flipObject from '../../auxiliary/flipObject';
import flipMatchResults from '../auxiliary/flipMatchResults';
import getResultName from '../auxiliary/getResultName';
import pluralizeResultName from '../auxiliary/pluralizeResultName';
import getPrintableNumber from '../../auxiliary/getPrintableNumber';
import calculateTotal from '../auxiliary/calculateTotal';


const initialStats = {
    change: null,
    result: null,
    total: 0,

    rounds: 0,
    wins: 0,
    losses: 0,
    draws: 0,

    goalsFor: 0,
    goalsAgainst: 0,
    goalsDifference: 0,

    match: null
};


function transformMatchesList(jsonList, params) {
    const resultChange = flipObject(params['resultMapping']);

    const [headers, ...matches] = jsonList.filter(row => row && row.length >= 5);
    const rowsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set([...matches.map(match => match[1]), ...matches.map(match => match[3])])];

    const itemsCurrentStats = new Map();
    itemsNames.forEach(name => itemsCurrentStats.set(name, Object.assign({}, initialStats)));

    const roundsResults = [];
    const rowsResults = rowsNames.map(round => {
        const rowResults = new Map();
        matches.filter(match => match[0] === round)
            .forEach(match => {
                const firstTeamResult = {
                    name: match[1],
                    match: {
                        location: params.locationFirst,
                        score: Number.parseInt(match[2], 10),
                        opponent: match[3],
                        opponentScore: Number.parseInt(match[4], 10)
                    }
                };

                [firstTeamResult, flipMatchResults(firstTeamResult)].forEach(teamResult => {
                    const stats = itemsCurrentStats.get(teamResult.name);

                    stats.rounds++;
                    stats.result = getResultName(teamResult.match.score, teamResult.match.opponentScore);
                    stats[pluralizeResultName(stats.result)]++;
                    stats.change = resultChange[stats.result];
                    stats.total = calculateTotal(params['totalValue'], stats);

                    stats.goalsFor += teamResult.match.score;
                    stats.goalsAgainst += teamResult.match.opponentScore;
                    stats.goalsDifference = getPrintableNumber(stats.goalsFor - stats.goalsAgainst, true);

                    stats.match = teamResult.match;

                    rowResults.set(teamResult.name, Object.assign({}, stats));

                    if (stats.rounds - 1 >= roundsResults.length) {
                        roundsResults.push(new Map());
                    }
                    roundsResults[stats.rounds - 1].set(teamResult.name, Object.assign({}, stats));
                });
            });
        itemsNames.filter(name => !rowResults.has(name))
            .forEach(name => {
                const stats = itemsCurrentStats.get(name);
                stats.change = null;
                stats.total = calculateTotal(params['totalValue'], stats);
                stats.match = null;
                rowResults.set(name, Object.assign({}, stats));
            });

        return rowResults;
    });


    itemsNames.forEach(name => {
        const stats = itemsCurrentStats.get(name);
        for (let round = stats.rounds; round < roundsResults.length; round++) {
            const newStats = Object.assign({}, stats);
            newStats.rounds = round;
            newStats.change = null;
            newStats.match = null;
            roundsResults[round].set(name, Object.assign({}, newStats));
        }
    });

    const resultsTable = params.useRoundsNumbers ? roundsResults : rowsResults;

    if (params.addStartRound) {
        const startRoundResults = new Map(itemsNames.map(item => [item, Object.assign({}, initialStats)]));
        resultsTable.unshift(startRoundResults);
        rowsNames.unshift(params.addStartRound);
    }

    const roundsNames = params.useRoundsNumbers
        ? [...new Array(resultsTable.length).keys()].map(number => number.toString())
        : rowsNames;

    return {
        status: 'success',
        roundsNames: roundsNames,
        extraColumnsNames: [],
        resultsTable: resultsTable
    };
}

export default transformMatchesList;