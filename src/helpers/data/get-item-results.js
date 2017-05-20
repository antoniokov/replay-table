export default function (results, item, filter = false) {
    return results
        .map(round => {
            const result = round.results.filter(result => result.item === item)[0];
            return Object.assign({}, result, { roundMeta: round.meta });
        }).filter(result => !filter || result.change !== null);
};
