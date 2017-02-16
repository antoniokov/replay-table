import transpose from '../../auxiliary/transpose';
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
    const rawRoundsNames = jsonTable[0].slice(offset);
    const roundsNames = params['useRoundsNames'] || !rawRoundsNames
        ? [...new Array(jsonTable[1].length).keys()].map(number => number.toString())
        : rawRoundsNames;

    const transposed = transpose(jsonTable.slice(1).filter(row => row[0]));
    const itemsNames = transposed[0];
    const extraColumns =  transposed.slice(1, offset)
        .map(column => new Map(itemsNames.map((item, i) => [item, column[i]])));
    const changes = transposed.slice(offset);

    const itemsStats = new Map();
    itemsNames.forEach(name => itemsStats.set(name, Object.assign({}, initialStats)));

    const resultsTable = changes.map(resultRow => {
        const roundResults = new Map();
        resultRow.forEach((changeString, itemNumber) => {
            const name = itemsNames[itemNumber];
            const stats = itemsStats.get(name);

            stats.change = changeString ? Number.parseInt(changeString, 10) || 0 : null;
            if (stats.change !== null) {
                stats.rounds++;
            }

            stats.result = params['resultMapping'][stats.change];
            if (stats.result) {
                stats[pluralizeResultName(stats.result)]++;
            }

            stats.total = calculateTotal(params['totalValue'], stats);
            roundResults.set(name, Object.assign({}, stats));
        });

        return roundResults;
    });

    if (params.addStartRound) {
        const startRoundResults = new Map(itemsNames.map(item => [item, Object.assign({}, initialStats)]));
        resultsTable.unshift(startRoundResults);
        roundsNames.unshift(params.addStartRound);
    }

    if (params['extraColumnsNumber']) {
        addExtras(resultsTable, extraColumnsNames, extraColumns);
    }

    return {
        status: 'success',
        itemName: itemName,
        extraColumnsNames: extraColumnsNames || [],
        roundsNames: roundsNames,
        resultsTable: resultsTable
    };
}

export default transformChangesTable;