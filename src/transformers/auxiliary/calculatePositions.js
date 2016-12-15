export default function calculatePositions (round, positionWhenTied = 'previous round') {
    const newRound = new Map(round);
    [...newRound.entries()].forEach(([item, result], i) => {
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
    });

    return newRound;
}