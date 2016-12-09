export default function addPositions (results, tieBreaking = 'no ties') {
    results.forEach(round => [...round.entries()].forEach(([item, result], i) => {
        if(tieBreaking === 'no ties') {
            result.position = i + 1;
            return;
        }

        const itemsHigher = [...round.values()].filter(res => res.total > result.total).length;

        if (tieBreaking === 'highest') {
            result.position = itemsHigher + 1;
        } else if (tieBreaking === 'range') {
            const itemsEqual = [...round.values()].filter(res => res.total === result.total).length - 1;
            if (itemsEqual) {
                result.position = `${itemsHigher + 1}-${itemsHigher + itemsEqual + 1}`
            } else {
                result.position = itemsHigher + 1;
            }
        }
    }));
}