export default function (tieBreaking) {
    return (a,b) => {
        //console.log(tieBreaking);
        const tieBreaker = ['total', ...tieBreaking].filter(calculation => b[1][calculation] !== a[1][calculation])[0];


        if (tieBreaker) {
            return b[1][tieBreaker] - a[1][tieBreaker];
        } else {
            return 0;
        }
    }
}