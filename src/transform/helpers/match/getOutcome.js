export default function (result) {
    if (result.match.score > result.match.opponentScore) {
        return 'win';
    } else if (result.match.score < result.match.opponentScore) {
        return 'loss';
    } else if (result.match.score === result.match.opponentScore) {
        return 'draw';
    }
}
