export default function (orderBy) {
    return (a,b) => {
        const tieBreaker = orderBy.filter(calc => b[calc].total !== a[calc].total)[0];

        if (tieBreaker) {
            return b[tieBreaker].total - a[tieBreaker].total;
        } else {
            return 0;
        }
    }
};
