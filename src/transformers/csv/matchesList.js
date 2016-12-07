import stableSort from '../../auxiliary/stableSort';
import addPositions from '../auxiliary/addPositions';


function updateItemsStats(itemsStats, homeItem, homeScore, awayItem, awayScore) {
    const newHomeItemStats = itemsStats.get(homeItem);
    const newAwayItemStats = itemsStats.get(awayItem);
    newHomeItemStats.games++;
    newAwayItemStats.games++;

    let winnerItem;
    if (homeScore > awayScore) {
        winnerItem = homeItem;
        newHomeItemStats.wins++;
        newAwayItemStats.losses++;
    } else if (homeScore < awayScore) {
        winnerItem = awayItem;
        newHomeItemStats.losses++;
        newAwayItemStats.wins++;
    } else {
        newHomeItemStats.ties++;
        newAwayItemStats.ties++;
    }

    itemsStats.set(homeItem, newHomeItemStats);
    itemsStats.set(awayItem, newAwayItemStats);

    return winnerItem;
}

function transformMatchesList(jsonList, params) {
    const [headers, ...matches] = jsonList;
    const roundsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set(matches.map(match => match[1]))];

    const itemsStats = new Map();
    itemsNames.forEach(item => itemsStats.set(item, { games: 0, wins: 0, losses: 0, ties: 0 }));

    const results = roundsNames.map(round => {
        const roundResults = [];
        matches.filter(match => match[0] === round)
            .forEach(match => {
                const homeItem = match[1];
                const awayItem = match[3];
                const homeScore = Number.parseInt(match[2], 10);
                const awayScore = Number.parseInt(match[4], 10);
                const winnerItem = updateItemsStats(itemsStats, homeItem, homeScore, awayItem, awayScore);

                [homeItem, awayItem].forEach(item => {
                    const stats = itemsStats.get(item);
                    roundResults.push({
                        item: item,
                        change: item === winnerItem ? 1 : 0,
                        total: (stats.wins/stats.games).toFixed(3)
                    });
                });
            });
        const itemsPlayed = roundResults.map(result => result.item);
        itemsNames.filter(item => !itemsPlayed.includes(item))
            .forEach(item => {
                const stats = itemsStats.get(item);
                roundResults.push({
                    item: item,
                    change: null,
                    total: stats.games ? (stats.wins/stats.games).toFixed(3) : (0).toFixed(3)
                });
            });

        return roundResults;
    });

    const resultsSorted = results.map(round => stableSort(round, (a,b) => b.total - a.total));
    addPositions(resultsSorted, params['tieBreaking']);

    return {
        status: 'success',
        roundsNames: roundsNames,
        extraColumnsNames: [],
        results: resultsSorted
    };
}

export default transformMatchesList;