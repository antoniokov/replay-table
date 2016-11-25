import transpose from '../Auxiliary/transpose'
import stableSort from '../Auxiliary/stableSort'


function parseDeltaTable(delta) {
    let [itemName, ...roundsNames] = delta[0];
    if(roundsNames.every(roundName => !isNaN(parseInt(roundName, 10)))) {
        roundsNames = roundsNames.map(roundName => parseInt(roundName, 10));
    }
    const [items, ...deltas] = transpose(delta.slice(1));
    const currentStandings = items.map(item => 0);
    const results = deltas.map(resultRow => resultRow.map((delta, itemNumber) => {
        const change = parseInt(delta, 10);
        currentStandings[itemNumber] += change;
        return {
            item: items[itemNumber],
            change: change,
            total: currentStandings[itemNumber]
        };
    }));

    const resultsSorted = results.map(row => stableSort(row, (a,b) => b.total - a.total));

    return [itemName, roundsNames, resultsSorted];
}

export default parseDeltaTable;