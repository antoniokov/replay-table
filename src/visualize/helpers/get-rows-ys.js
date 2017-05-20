export default function (rows) {
    const ys = {};
    rows.nodes().forEach(n => {
        const item = n.__data__.item;
        const top = n.getBoundingClientRect().top;
        if (!ys[item] || ys[item] < top) {
            ys[item] = top
        }
    });

    return ys;
};
