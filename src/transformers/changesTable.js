import transpose from '../auxiliary/transpose'
import stableSort from '../auxiliary/stableSort'


function addPositions (results, tieBreaking = 'no ties') {
    results.forEach(round => round.forEach((result, i) => {
        if(tieBreaking === 'no ties') {
            result.position = i + 1;
            return;
        }

        const itemsHigher = round.reduce((acc, res) => res.item !== result.item && res.total > result.total
                ? acc + 1
                : acc
            , 0);

        result.position = itemsHigher + 1;

        if (tieBreaking === 'range') {
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
    let itemName, extraColumnsNames, roundsNames;
    if (!params['extraColumnsNumber']) {
        [itemName, ...roundsNames] = jsonTable[0];
    } else {
        itemName = jsonTable[0][0];
        extraColumnsNames = jsonTable[0].slice(1, params['extraColumnsNumber'] + 1);
        roundsNames = jsonTable[0].slice(params['extraColumnsNumber'] + 1);
    }

    if (roundsNames) {
        if(roundsNames.every(roundName => !isNaN(roundName))) {
            roundsNames.forEach(roundName => Number.parseInt(roundName, 10));
        }
    } else {
        roundsNames = [...new Array(jsonTable[1].length).keys()];
    }

    let items, extraColumns = [], changes;
    const transposed = transpose(jsonTable.slice(1));
    if (!params['extraColumnsNumber']) {
        [items, ...changes] =  transposed;
    } else {
        items = transposed[0];
        extraColumns = transposed.slice(1, params['extraColumnsNumber'] + 1);
        changes = transposed.slice(params['extraColumnsNumber'] + 1);
    }

    const currentStandings = items.map(item => 0);
    const results = changes.map(resultRow => resultRow.map((changeString, itemNumber) => {
        const change = changeString ? Number.parseInt(changeString, 10) || 0 : null;
        currentStandings[itemNumber] += change || 0;

        const extras = extraColumns.reduce((obj, col, i) => Object.assign(obj, { [extraColumnsNames[i]]: col[itemNumber] }), {});

        return {
            item: items[itemNumber],
            extras: extras,
            change: change,
            total: currentStandings[itemNumber]
        };
    }))
        .map(round => stableSort(round, (a,b) => b.total - a.total));

    if (params['startRoundName']) {
        results.unshift(items.map(item => ({
            item: item,
            change: 0,
            total: 0
        })));
        roundsNames.unshift(params['startRoundName']);
    }

    addPositions(results, params['tieBreaking']);

    return {
        status: 'success',
        itemName: itemName,
        extraColumnsNames: extraColumnsNames || [],
        roundsNames: roundsNames,
        results: results
    };
}

export default transformChangesTable;