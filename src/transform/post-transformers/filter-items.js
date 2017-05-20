export default function (transformedData, items) {
    return transformedData.map(round => {
        return {
            name: round.name,
            results: round.results.filter(result => items.includes(result.item))
        }
    })
};
