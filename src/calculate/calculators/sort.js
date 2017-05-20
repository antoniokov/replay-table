import sortRoundResults from '../helpers/sort-round-results';
import getCompareFunction from '../helpers/get-compare-function';


export default function (data, params) {
    const sorted = data.slice(0, 1);

    const compareFunction = getCompareFunction(params.orderBy);
    data.slice(1).forEach((round, i) => {
        sorted.push({
            name: round.name,
            results: sortRoundResults(round.results, sorted[i].results, compareFunction)
        });
    });

    return sorted;
};
