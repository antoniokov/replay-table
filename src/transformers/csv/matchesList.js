import flipObject from '../../auxiliary/flipObject';
import stableSort from '../../auxiliary/stableSort';
import pluralizeResult from '../auxiliary/pluralizeResult';
import addPositions from '../auxiliary/addPositions';


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
    const roundsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set(matches.map(match => match[1]))];

    const itemsStats = new Map();
    itemsNames.forEach(name => itemsStats.set(name, { change: null, total: 0, rounds: 0, wins: 0, losses: 0, draws: 0 }));

    const results = roundsNames.map(round => {
        const roundResults = new Map();
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
                    const stats = itemsStats.get(item.name);
                    stats.rounds++;
                    stats[pluralizeResult(item.result)]++;
                    stats.change = resultChange[item.result];
                    stats.total = (stats.wins/stats.rounds).toFixed(3);

                    if (!params['itemsToShow'] || params['itemsToShow'].includes(item.name)) {
                        roundResults.set(item.name, Object.assign({}, stats));
                    }
                });
            });
        itemsNames.filter(name => !roundResults.has(name))
            .forEach(name => {
                if (!params['itemsToShow'] || params['itemsToShow'].includes(name)) {
                    const stats = itemsStats.get(name);
                    stats.change = null;
                    stats.total = stats.rounds ? (stats.wins / stats.rounds).toFixed(3) : (0).toFixed(3);
                    roundResults.set(name, Object.assign({}, stats));
                }
            });

        return roundResults;
    });

    const resultsSorted = results.map(round => new Map(stableSort([...round.entries()], (a,b) => b[1].total - a[1].total)));
    addPositions(resultsSorted, params['tieBreaking']);

    return {
        status: 'success',
        roundsNames: roundsNames,
        extraColumnsNames: [],
        results: resultsSorted
    };
}

export default transformMatchesList;