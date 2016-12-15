export default function addPositions (results, positionWhenTied = 'previous round') {
    results.forEach(round => [...round.entries()].forEach(([item, result], i) => {
        if(positionWhenTied === 'previous round') {
            result.position = i + 1;
            return;
        }

        const itemsHigher = [...round.values()].filter(res => res.total > result.total).length;

        if (positionWhenTied === 'highest') {
            result.position = itemsHigher + 1;
        } else if (positionWhenTied === 'range') {
            const itemsEqual = [...round.values()].filter(res => res.total === result.total).length - 1;
            if (itemsEqual) {
                result.position = `${itemsHigher + 1}-${itemsHigher + itemsEqual + 1}`
            } else {
                result.position = itemsHigher + 1;
            }
        }
    }));
}