export default function (transformedData, roundName) {
    const startRoundResults = transformedData[0].results.map(result => {
        const startResult = Object.assign({}, result);

        ['change', 'match', 'outcome']
            .filter(key => result.hasOwnProperty(key))
            .forEach(key => startResult[key] = null);

        if (startResult.extras) {
            Object.keys(startResult.extras)
                .filter(key => key !== 'item')
                .forEach(key => startResult.extras[key] = null);
        }

        return startResult;
    });

    return [{
        name: roundName,
        results: startRoundResults
    }].concat(transformedData);
};
