import flipObject from '../../helpers/general/flip-object';
import flipMatchResult from '../helpers/match/flip';
import getMatchOutcome from '../helpers/match/getOutcome';


export default function (rawData, params) {
    const list = new List(rawData, params.format);
    const outcomeToChange = flipObject(params.changeToOutcome);

    return list.roundsNames.map(roundName => {
        const roundResults = [];
        list.matches.filter(match => list.getRoundName(match) === roundName)
            .forEach(match => {
                const firstTeamResult = {
                    team: list.getFirstTeam(match),
                    match: {
                        location: params.locationFirst,
                        score: list.getScore(match),
                        opponent: list.getSecondTeam(match),
                        opponentScore: list.getOpponentScore(match)
                    }
                };

                [firstTeamResult, flipMatchResult(firstTeamResult)].forEach(teamResult => {
                    const outcome = getMatchOutcome(teamResult);

                    roundResults.push({
                        item: teamResult.team,
                        change: outcome ? outcomeToChange[outcome] : null,
                        outcome: outcome,
                        match: teamResult.match,
                        extras: {}
                    });
                });
            });


        list.itemsNames.filter(name => !roundResults.map(result => result.item).includes(name))
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

class List {
    constructor(data, format) {
        this.data = data;
        this.format = format;

        switch (format) {
            case 'csv':
                const [headers, ...matches] = data.filter(row => row && row.length >= 5);
                this.matches = matches;
                break;
            case 'football-data.org':
                this.matches = data.fixtures;
                break;
        }

        this.roundsNames = [...new Set(this.matches.map(match => this.getRoundName(match)))];
        this.itemsNames = [...new Set([...this.matches.map(match => this.getFirstTeam(match)),
                                       ...this.matches.map(match => this.getSecondTeam(match))])];
    }

    getRoundName (match) {
        switch (this.format) {
            case 'csv':
                return match[0];
            case 'football-data.org':
                return match.matchday.toString();
        }
    }

    getFirstTeam (match) {
        switch (this.format) {
            case 'csv':
                return match[1];
            case 'football-data.org':
                return match.homeTeamName;
        }
    }

    getSecondTeam (match) {
        switch (this.format) {
            case 'csv':
                return match[3];
            case 'football-data.org':
                return match.awayTeamName;
        }
    }

    getScore (match) {
        switch (this.format) {
            case 'csv':
                return Number.parseInt(match[2], 10);
            case 'football-data.org':
                return match.status === 'FINISHED' ? match.result.goalsHomeTeam : null;
        }
    }

    getOpponentScore (match) {
        switch (this.format) {
            case 'csv':
                return Number.parseInt(match[4], 10)
            case 'football-data.org':
                return match.status === 'FINISHED' ? match.result.goalsAwayTeam : null;
        }
    }
}
