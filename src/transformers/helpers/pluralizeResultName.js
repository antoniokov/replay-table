export default function (result) {
    return {
        'win': 'wins',
        'loss': 'losses',
        'draw': 'draws'
    }[result];
}