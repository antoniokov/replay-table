import stableSort from '../../auxiliary/stableSort';
import addPositions from '../auxiliary/addPositions';


function updateItemsStats(itemsStats, homeItem, homeScore, awayItem, awayScore) {
    const homeItemStats = itemsStats.get(homeItem);
    const awayItemStats = itemsStats.get(awayItem);
    homeItemStats.games++;
    awayItemStats.games++;

    let winnerItem;
    if (homeScore > awayScore) {
        winnerItem = homeItem;
        homeItemStats.wins++;
        awayItemStats.losses++;
    } else if (homeScore < awayScore) {
        winnerItem = awayItem;
        homeItemStats.losses++;
        awayItemStats.wins++;
    } else {
        homeItemStats.ties++;
        awayItemStats.ties++;
    }

    return winnerItem;
}

function transformMatchesList(jsonList, params) {
    const [headers, ...matches] = jsonList;
    const roundsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set(matches.map(match => match[1]))];

    const itemsStats = new Map();
    itemsNames.forEach(item => itemsStats.set(item, { games: 0, wins: 0, losses: 0, ties: 0 }));

    const results = roundsNames.map(round => {
        const roundResults = new Map();
        matches.filter(match => match[0] === round)
            .forEach(match => {
                const homeItem = match[1];
                const awayItem = match[3];
                const homeScore = Number.parseInt(match[2], 10);
                const awayScore = Number.parseInt(match[4], 10);
                const winnerItem = updateItemsStats(itemsStats, homeItem, homeScore, awayItem, awayScore);

                [homeItem, awayItem].forEach(item => {
                    if (!params['itemsToShow'] || params['itemsToShow'].includes(item)) {
                        const stats = itemsStats.get(item);
                        roundResults.set(item, {
                            change: item === winnerItem ? 1 : 0,
                            total: (stats.wins/stats.games).toFixed(3)
                        });
                    }
                });
            });
        itemsNames.filter(item => !roundResults.has(item))
            .forEach(item => {
                if (!params['itemsToShow'] || params['itemsToShow'].includes(item)) {
                    const stats = itemsStats.get(item);
                    roundResults.set(item, {
                        change: null,
                        total: stats.games ? (stats.wins / stats.games).toFixed(3) : (0).toFixed(3)
                    });
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