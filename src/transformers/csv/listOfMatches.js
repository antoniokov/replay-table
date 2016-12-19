import flipObject from '../../auxiliary/flipObject';
import getRoundsNames from '../auxiliary/getRoundsNames';
import pluralizeResult from '../auxiliary/pluralizeResult';
import calculateTotal from '../auxiliary/calculateTotal';

function getResult(score, opponentScore) {
    if (score > opponentScore) {
        return 'win';
    } else if (score < opponentScore) {
        return 'loss'
    } else if (score === opponentScore) {
        return 'draw'
    }
}

function transformMatchesList(jsonList, params) {
    const resultChange = flipObject(params['resultMapping']);

    const [headers, ...matches] = jsonList;
    const rowsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set([...matches.map(match => match[1]), ...matches.map(match => match[3])])];

    const itemsCurrentStats = new Map();
    const initialStats = { change: null, total: 0, rounds: 0, wins: 0, losses: 0, draws: 0 };
    itemsNames.forEach(name => itemsCurrentStats.set(name, Object.assign({}, initialStats)));

    const roundsResults = [];
    const rowsResults = rowsNames.map(round => {
        const rowResults = new Map();
        matches.filter(match => match[0] === round)
            .forEach(match => {
                const homeItem = {
                    name: match[1],
                    score: Number.parseInt(match[2], 10)
                };
                const awayItem = {
                    name: match[3],
                    score: Number.parseInt(match[4], 10)
                };

                homeItem.result = getResult(homeItem.score, awayItem.score);
                awayItem.result = getResult(awayItem.score, homeItem.score);

                [homeItem, awayItem].forEach(item => {
                    const stats = itemsCurrentStats.get(item.name);
                    stats.rounds++;
                    stats[pluralizeResult(item.result)]++;
                    stats.change = resultChange[item.result];
                    stats.total = calculateTotal(params['totalValue'], stats);

                    if (stats.rounds - 1 >= roundsResults.length) {
                        roundsResults.push(new Map());
                    }

                    rowResults.set(item.name, Object.assign({}, stats));
                    roundsResults[stats.rounds - 1].set(item.name, Object.assign({}, stats));
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