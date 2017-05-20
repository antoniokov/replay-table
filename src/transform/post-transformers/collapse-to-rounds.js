import getItems from '../../helpers/data/get-items';


export default function (transformedData) {
    const items = getItems(transformedData);
    const itemRound = items.reduce((obj, item) => Object.assign(obj, { [item]: 0 }), {});

    const collapsed = [];

    transformedData.forEach(round => {
        round.results
            .filter(result => result.change !== null)
            .forEach(result => {
                const roundNumber = ++itemRound[result.item];

                if (collapsed.length < roundNumber) {
                    collapsed.push({
                        name: roundNumber.toString(),
                        results: []
                    });
                }

                collapsed[roundNumber - 1].results.push(result);
            });
    });

    return collapsed;
};
