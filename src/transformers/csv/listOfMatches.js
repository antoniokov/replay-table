import flipObject from '../../auxiliary/flipObject';
import flipMatchResults from '../auxiliary/flipMatchResults';
import getResultName from '../auxiliary/getResultName';
import pluralizeResultName from '../auxiliary/pluralizeResultName';
import getPrintableNumber from '../../auxiliary/getPrintableNumber';
import getRoundsNames from '../auxiliary/getRoundsNames';
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

    const [headers, ...matches] = jsonList;
    const rowsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set([...matches.map(match => match[1]), ...matches.map(match => match[3])])];

    const itemsCurrentStats = new Map();
    itemsNames.forEach(name => itemsCurrentStats.set(name, Object.assign({}, initialStats)));

    const roundsResults = [];
    const rowsResults = rowsNames.map(round => {
        const rowResults = new Map();
        matches.filter(match => match[0] === round)
            .forEach(match => {
                const homeTeamResult = {
                    name: match[1],
                    match: {
                        location: 'home',
                        score: Number.parseInt(match[2], 10),
                        opponent: match[3],
                        opponentScore: Number.parseInt(match[4], 10)
                    }
                };

                [homeTeamResult, flipMatchResults(homeTeamResult)].forEach(teamResult => {
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
            roundsResults[round].set(name, Object.assign({}, newStats));
        }
    });

    const results = params['useRoundsNumbers'] ? roundsResults : rowsResults;

    if (params['startRoundName']) {
        const startRoundResults = new Map(itemsNames.map(item => [item, Object.assign({}, initialStats)]));
        results.unshift(startRoundResults);
        rowsNames.unshift(params['startRoundName']);
    }

    const roundsNames = params['useRoundsNumbers'] ? getRoundsNames(null, results.length) : getRoundsNames(rowsNames);

    return {
        status: 'success',
        roundsNames: roundsNames,
        extraColumnsNames: [],
        results: results
    };
}

export default transformMatchesList;