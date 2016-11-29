import transpose from '../auxiliary/transpose'
import stableSort from '../auxiliary/stableSort'


function addPositions (results, ties) {
    results.forEach(round => round.forEach((result, i) => {
        if(ties === 'no ties') {
            result.position = i + 1;
            return;
        }

        const itemsHigher = round.reduce((acc, res) => res.item !== result.item && res.total > result.total
                ? acc + 1
                : acc
            , 0);

        result.position = itemsHigher + 1;

        if (ties === 'range') {
            const itemsEqual = round.reduce((acc, res) => res.item !== result.item && res.total === result.total
                    ? acc + 1
                    : acc
                , 0);


            if (itemsEqual) {
                result.position += `-${itemsHigher + itemsEqual + 1}`
            }
        }
    }));
}

function parseDeltaTable(delta, ties = 'no ties') {
    let [itemName, ...roundsNames] = delta[0];
    if(roundsNames.every(roundName => Number.isInteger(roundName))) {
        roundsNames = roundsNames.map(roundName => Number.parseInt(roundName, 10));
    }
    const [items, ...deltas] = transpose(delta.slice(1));
    const currentStandings = items.map(item => 0);
    const results = deltas.map(resultRow => resultRow.map((delta, itemNumber) => {
        const change = Number.parseInt(delta, 10);
        currentStandings[itemNumber] += change;
        return {
            item: items[itemNumber],
            change: change,
            total: currentStandings[itemNumber]
        };
    }))
        .map(round => stableSort(round, (a,b) => b.total - a.total));

    addPositions(results, ties);

    return [itemName, roundsNames, results];
}

export default parseDeltaTable;