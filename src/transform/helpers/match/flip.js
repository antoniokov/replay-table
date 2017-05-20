export default function (result) {
    return {
        team: result.match.opponent,
        match: {
            location: flipLocation(result.match.location),
            score: result.match.opponentScore,
            opponent: result.team,
            opponentScore: result.match.score
        }
    };
}

function flipLocation (location) {
    switch (location) {
        case 'home':
            return 'away';
        case 'away':
            return 'home';
        case 'neutral':
            return 'neutral';
        default:
            return null;
    }
}
