export default function (totalValue, stats) {
        switch (totalValue) {
            case 'cumulative':
                return stats.total + stats.change || 0;
            case 'win %':
                return stats.rounds ? (stats.wins / stats.rounds).toFixed(3) : (0).toFixed(3);
            default:
                return stats.total + stats.change || 0;
        }
}