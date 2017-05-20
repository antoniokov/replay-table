import getCompareFunction from '../helpers/get-compare-function';


export default function (data, params) {
    const compare = getCompareFunction(params.orderBy);

    return data.map(round => {
        const results = round.results.map((result, i) => {
            const positionedResult = Object.assign({}, result);

            const itemsHigher = round.results.filter(res => compare(res, result) < 0);
            const itemsEqual = round.results.filter(res => res.item !== result.item && compare(res, result) === 0);

            positionedResult.position = {
                strict: i + 1,
                highest: itemsHigher.length + 1,
                lowest: itemsHigher.length + itemsEqual.length + 1
            };

            return positionedResult;
        });

        return {
            name: round.name,
            results: results
        }
    })
};
