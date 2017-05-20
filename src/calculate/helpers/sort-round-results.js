export default function (roundResults, sortedPreviousRoundResults, compareFunction) {
    return roundResults.map(result => {
            return {
                obj: result,
                idx: sortedPreviousRoundResults.map(result => result.item).indexOf(result.item),
            }
        })
        .sort((a,b) => compareFunction(a.obj, b.obj) ? compareFunction(a.obj, b.obj) : a.idx - b.idx)
        .map(item => item.obj);
};
