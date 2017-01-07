import transpose from '../../auxiliary/transpose';
import getRoundsNames from '../auxiliary/getRoundsNames';
import pluralizeResultName from '../auxiliary/pluralizeResultName';
import calculateTotal from '../auxiliary/calculateTotal';


const initialStats = {
    change: null,
    result: null,
    total: 0,

    rounds: 0,
    wins: 0,
    losses: 0,
    draws: 0
};


function addExtras (results, extraColumnsNames, extraColumns) {
    results.forEach(round => round.forEach((result, item) => {
            result.extras = extraColumns.reduce((obj, col, i) => Object.assign(obj, { [extraColumnsNames[i]]: col.get(item) }), {});
        }));
}

function transformChangesTable(jsonTable, params) {
    const offset = (params['extraColumnsNumber'] || 0) + 1;

    const itemName = jsonTable[0][0];
    const extraColumnsNames = jsonTable[0].slice(1, offset);
    const roundsNames = getRoundsNames(params['useRoundsNames'] ? null : jsonTable[0].slice(offset), jsonTable[1].length);

    const transposed = transpose(jsonTable.slice(1));
    const itemsNames = transposed[0];
    const extraColumns =  transposed.slice(1, offset)
        .map(column => new Map(itemsNames.map((item, i) => [item, column[i]])));
    const changes = transposed.slice(offset);

    const itemsStats = new Map();
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
                stats[pluralizeResultName(result)]++;
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