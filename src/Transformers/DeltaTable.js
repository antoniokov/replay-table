function transpose(matrix) {
    return Object.keys(matrix[0])
        .map(colNumber => matrix.map(rowNumber => rowNumber[colNumber]));
}

function parseDeltaTable(delta) {
    var [itemName, ...roundsNames] = delta[0];
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

    return [itemName, roundsNames, results];
}

export default parseDeltaTable;