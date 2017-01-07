//https://github.com/TargetProcess/replayTable#presets
export const presets = {
    "WinsLosses": {
        inputType: 'listOfMatches',
        itemName: 'Team',
        totalName: 'Win %',
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
        roundName: 'Race',
        itemName: 'Driver',
        startRoundName: 'Start →',
        resultMapping: {
            25: 'win'
        }
    },

    "ЧГК": {
        seasonName: 'Турнир',
        roundName: 'Вопрос',
        itemName: 'Команда',
        totalName: 'Взято',
        positionWhenTied: 'range',
        resultMapping: {
            1: 'win',
            0: ' '
        }
    }
};
