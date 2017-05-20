export default function (results) {
    return [...new Set(results.reduce((list, round) => [...list, ...round.results.map(result => result.item)], []))];
};
