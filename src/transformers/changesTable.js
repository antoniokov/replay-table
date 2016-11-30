import transpose from '../auxiliary/transpose'
import stableSort from '../auxiliary/stableSort'


function addPositions (results, tiesResolution = 'no ties') {
    results.forEach(round => round.forEach((result, i) => {
        if(tiesResolution === 'no ties') {
            result.position = i + 1;
            return;
        }

        const itemsHigher = round.reduce((acc, res) => res.item !== result.item && res.total > result.total
                ? acc + 1
                : acc
            , 0);

        result.position = itemsHigher + 1;

        if (tiesResolution === 'range') {
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

function transformChangesTable(jsonTable, params) {
    let [itemName, ...roundsNames] = jsonTable[0];
    if (roundsNames) {
        if(roundsNames.every(roundName => Number.isInteger(roundName))) {
            roundsNames.forEach(roundName => Number.parseInt(roundName, 10));
        }
    } else {
        roundsNames = [...new Array(jsonTable[1].length).keys()];
    }

    const [items, ...changes] = transpose(jsonTable.slice(1));
    const currentStandings = items.map(item => 0);
    const results = changes.map(resultRow => resultRow.map((changeString, itemNumber) => {
        const change = Number.parseInt(changeString, 10);
        currentStandings[itemNumber] += change;
        return {
            item: items[itemNumber],
            change: change,
            total: currentStandings[itemNumber]
        };
    }))
        .map(round => stableSort(round, (a,b) => b.total - a.total));

    addPositions(results, params.tiesResolution);

    return {
        status: 'success',
        itemName: itemName,
        roundsNames: roundsNames,
        results: results
    };
}

export default transformChangesTable;