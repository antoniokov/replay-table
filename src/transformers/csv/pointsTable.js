import transpose from '../../auxiliary/transpose';
import pluralizeResult from '../auxiliary/pluralizeResult';
import calculateTotal from '../auxiliary/calculateTotal';


function addExtras (results, extraColumnsNames, extraColumns) {
    results.forEach(round => round.forEach((result, item) => {
            result.extras = extraColumns.reduce((obj, col, i) => Object.assign(obj, { [extraColumnsNames[i]]: col.get(item) }), {});
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

    let itemsNames, extraColumns = [], changes;
    const transposed = transpose(jsonTable.slice(1));
    if (!params['extraColumnsNumber']) {
        [itemsNames, ...changes] =  transposed;
    } else {
        itemsNames = transposed[0];
        extraColumns = transposed.slice(1, params['extraColumnsNumber'] + 1)
            .map(column => new Map(itemsNames.map((item, i) => [item, column[i]])));
        changes = transposed.slice(params['extraColumnsNumber'] + 1);
    }

    const itemsStats = new Map();
    const initialStats = { change: null, total: 0, rounds: 0, wins: 0, losses: 0, draws: 0 };
    itemsNames.forEach(name => itemsStats.set(name, Object.assign({}, initialStats)));

    const results = changes.map(resultRow => {
        const roundResults = new Map();
        resultRow.forEach((changeString, itemNumber) => {
            const name = itemsNames[itemNumber];
            const stats = itemsStats.get(name);

            stats.change = changeString ? Number.parseInt(changeString, 10) || 0 : null;
            if (stats.change !== null) {
                stats.rounds++;
            }

            const result = params['resultMapping'][stats.change];
            if (result) {
                stats[pluralizeResult(result)]++;
            }

            stats.total = calculateTotal(params['totalValue'], stats);
            roundResults.set(name, Object.assign({}, stats));
        });

        return roundResults;
    });

    if (params['startRoundName']) {
        const startRoundResults = new Map(itemsNames.map(item => [item, Object.assign({}, initialStats)]));
        results.unshift(startRoundResults);
        roundsNames.unshift(params['startRoundName']);
    }

    if (params['extraColumnsNumber']) {
        addExtras(results, extraColumnsNames, extraColumns);
    }

    return {
        status: 'success',
        itemName: itemName,
        extraColumnsNames: extraColumnsNames || [],
        roundsNames: roundsNames,
        results: results
    };
}

export default transformChangesTable;