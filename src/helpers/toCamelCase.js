export default function (str) {
    return str.replace(/-([a-z])/g, function (g) { console.log(g); return g[1].toUpperCase(); });
}