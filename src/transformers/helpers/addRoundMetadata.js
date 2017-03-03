export default function (round, name, index) {
    const meta = {
        name: name,
        index: index,
        leader: [...round.keys()][0],
        areAllResultsMapped: [...round.values()].every(result => !!result.result || result.change === null),
        maxAbsChange: Math.max(...[...round.values()].map(result => Math.abs(result.change))),
        changesSum: [...round.values()].reduce((sum, result) => sum + (result.change || 0), 0)
    };

    return {
        meta: meta,
        results: round
    }
}