//https://github.com/TargetProcess/replayTable#presets
export default {
    "WinsLosses": {
        inputType: 'listOfMatches',
        terms: {
            'total': 'Win %'
        },
        totalValue: 'win %',
        resultMapping: {
            1: 'win',
            0: 'loss'
        },
        calculatedColumns: {
            'rounds': 'G',
            'wins': 'W',
            'losses': 'L'
        }
    },

    "F1": {
        terms: {
            'round': 'Race',
            'item': 'Driver',
            'startRound': 'Start →'
        },
        resultMapping: {
            25: 'win'
        }
    },

    "ЧГК": {
        terms: {
            'season': 'Турнир',
            'round': 'Вопрос',
            'changes': 'Вопрос',
            'position': 'Место',
            'item': 'Команда',
            'total': 'Взято',
            'change': 'Вопрос'
        },
        positionWhenTied: 'range',
        resultMapping: {
            1: 'win',
            0: ' '
        }
    }
};
