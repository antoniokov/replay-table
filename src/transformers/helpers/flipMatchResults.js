export default function (opponentResults) {
    const results = {
        name: opponentResults.match.opponent,
        match: {}
    };

    switch (opponentResults.match.location) {
        case 'home':
            results.match.location = 'away';
            break;
        case 'away':
            results.match.location = 'home';
            break;
        case 'neutral':
            results.match.location = 'neutral';
            break;
    }

    results.match.opponent = opponentResults.name;
    results.match.score = opponentResults.match.opponentScore;
    results.match.opponentScore = opponentResults.match.score;

    return results;
}