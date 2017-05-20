export default function (path) {
    return new Promise ((resolve, reject) => {
            d3.text(path, text => {
                if (!text) {
                    reject(`Sorry, we can't reach your csv file`);
                    return;
                }

                const parsed = d3.csvParseRows(text);
                resolve(parsed);
            });
        }
    );
};
