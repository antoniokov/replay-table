import calculatables from '../calculations';
import getItems from '../../helpers/data/get-items';


export default function (transformedData, params) {
    const calculations = Object.keys(calculatables)
        .filter(calc => calculatables[calc].check(transformedData));

    const items = getItems(transformedData);

    const initialStats = calculations.reduce((obj, calc) => Object.assign(obj, { [calc]: 0 }), {});
    const itemStats = items.reduce((obj, item) => Object.assign(obj, { [item]: Object.assign({}, initialStats) }), {});


    return transformedData.map(round => {
        const results = round.results.map(result => {
            const calculatedResult = Object.assign({}, result);
            const stats = itemStats[result.item];

            calculations.filter(calc => !calculatables[calc].isPost)
                .forEach(calc => {
                    const change = calculatables[calc].calculate(calculatedResult);
                    calculatedResult[calc] = {
                        change: change,
                        total: stats[calc] + change
                    };
                    stats[calc] += change;
                });

            calculations.filter(calc => calculatables[calc].isPost)
                .forEach(calc => {
                    const total = calculatables[calc].calculate(calculatedResult);
                    calculatedResult[calc] = {
                        change: null,
                        total: total
                    }
                });

            return calculatedResult;
        });

        return {
            name: round.name,
            results: results
        }
    });
};
