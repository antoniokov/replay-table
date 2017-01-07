export default function (score, opponentScore) {
    if (score > opponentScore) {
        return 'win';
    } else if (score < opponentScore) {
        return 'loss'
    } else if (score === opponentScore) {
        return 'draw'
    }
}