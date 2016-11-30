export default function (array, compareFunction) {
    return array.map((o,i) => ({obj: o, idx: i}))
        .sort((a,b) => compareFunction(a.obj, b.obj) ? compareFunction(a.obj, b.obj) : a.idx - b.idx)
        .map(item => item.obj);
}
