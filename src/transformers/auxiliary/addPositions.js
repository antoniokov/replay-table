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

export default addPositions;