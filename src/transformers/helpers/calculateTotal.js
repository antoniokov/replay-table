export default function (totalValue, stats) {
        switch (totalValue) {
            case 'cumulative':
                return stats.total + stats.change || 0;
            case 'win %':
                return stats.rounds > 0 ? (stats.wins / stats.rounds) : 0;
            default:
                return stats.total + stats.change || 0;
        }
}