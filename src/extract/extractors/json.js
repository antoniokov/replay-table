export default function (path) {
    return new Promise ((resolve, reject) => {
            d3.json(path, data => {
                if (!data) {
                    reject(`Sorry, we can't reach your json file`);
                    return;
                }

                resolve(data);
            });
        }
    );
};
