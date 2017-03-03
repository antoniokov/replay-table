import comparePositions from './comparePositions';


export default function calculatePositions (round, positionWhenTied, tieBreaking) {
    const newRound = new Map(round);
    [...newRound.entries()].forEach(([item, result], i) => {
        if(positionWhenTied === 'previous round') {
            result.position = i + 1;
            return;
        }

        const itemsHigher = [...round.entries()]
            .filter(entry => comparePositions(tieBreaking)(entry, [item, result]) < 0).length;

        if (positionWhenTied === 'highest') {
            result.position = itemsHigher + 1;
        } else if (positionWhenTied === 'range') {
            const itemsEqual = [...round.entries()]
                .filter(entry => comparePositions(tieBreaking)(entry, [item, result]) === 0).length - 1;

            if (itemsEqual) {
                result.position = `${itemsHigher + 1}-${itemsHigher + itemsEqual + 1}`
            } else {
                result.position = itemsHigher + 1;
            }
        }
    });

    return newRound;
}