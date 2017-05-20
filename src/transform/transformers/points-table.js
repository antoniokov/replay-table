import transpose from '../../helpers/general/transpose';


export default function (rawData, params) {
    const offset = (params.extraColumnsNumber || 0) + 1;

    const extraColumnsNames = rawData[0].slice(1, offset);
    const roundsNames = rawData[0].slice(offset);

    const transposed = transpose(rawData.slice(1).filter(row => row[0]));
    const itemsNames = transposed[0];
    const extraColumns =  transposed.slice(1, offset)
        .map(column => new Map(itemsNames.map((item, i) => [item, column[i]])));
    const changes = transposed.slice(offset);


    return changes.map((resultRow, rowIndex) => {
        const roundResults = [];
        resultRow.forEach((changeString, itemNumber) => {
            const item = itemsNames[itemNumber];
            const change = changeString ? Number.parseInt(changeString, 10) || 0 : null;

            roundResults.push({
                item: item,
                change: change,
                outcome: params.changeToOutcome[change] || null,
                extras: {
                    item: extraColumns.reduce((obj, col, i) => Object.assign(obj, { [extraColumnsNames[i]]: col.get(item) }), {})
                }
            });
        });

        return {
            name: roundsNames[rowIndex],
            results: roundResults
        };
    });
}
