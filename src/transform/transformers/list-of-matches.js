import flipObject from '../../helpers/general/flip-object';
import flipMatchResult from '../helpers/match/flip';
import getMatchOutcome from '../helpers/match/getOutcome';


export default function (rawData, params) {
    const [headers, ...matches] = rawData.filter(row => row && row.length >= 5);
    const rowsNames = [...new Set(matches.map(match => match[0]))];
    const itemsNames = [...new Set([...matches.map(match => match[1]), ...matches.map(match => match[3])])];

    const outcomeToChange = flipObject(params.changeToOutcome);

    return rowsNames.map(roundName => {
        const roundResults = [];
        matches.filter(match => match[0] === roundName)
            .forEach(match => {
                const firstTeamResult = {
                    team: match[1],
                    match: {
                        location: params.locationFirst,
                        score: Number.parseInt(match[2], 10),
                        opponent: match[3],
                        opponentScore: Number.parseInt(match[4], 10)
                    }
                };

                [firstTeamResult, flipMatchResult(firstTeamResult)].forEach(teamResult => {
                    const outcome = getMatchOutcome(teamResult);

                    roundResults.push({
                        item: teamResult.team,
                        change: outcomeToChange[outcome],
                        outcome: outcome,
                        match: teamResult.match,
                        extras: {}
                    });
                });
            });


        itemsNames.filter(name => !roundResults.map(result => result.item).includes(name))
            .forEach(name => {
                roundResults.push({
                    item: name,
                    change: null,
                    match: null,
                    extras: {}
                });
            });

        return {
            name: roundName,
            results: roundResults
        };
    });
}
