import React from 'react';


function getMatch (item, match, locationFirst) {
    if (!locationFirst || match.location === locationFirst) {
        return {
            firstTeam: item,
            firstScore: match.score,
            secondTeam: match.opponent,
            secondScore: match.opponentScore
        }
    } else {
        return {
            firstTeam: match.opponent,
            firstScore: match.opponentScore,
            secondTeam: item,
            secondScore: match.score
        }
    }
}

function isTeamClickable(team, itemsToShow) {
    return !itemsToShow || itemsToShow.includes(team);
}


function Matches (props) {
    return (
        <table className="r-table matches">
            <tbody>
                {props.results.map(([team, result], i) => {
                    if (!result.match) {
                        return (
                            <tr key={props.firstColumn[i] || team} className={`replay-table-row`}>
                                <td className="position">{props.firstColumn[i]}</td>
                                {isTeamClickable(team, props.itemsToShow)
                                    ? <td className="team link" onClick={() => props.selectItem(team)}>{team}</td>
                                    : <td className="team">{team}</td>
                                }
                                <td className="score">{}</td>
                                <td className="team">{}</td>
                            </tr>
                        );
                    } else {
                        const match = getMatch(team, result.match, props.locationFirst);
                        return (
                            <tr key={props.firstColumn[i] || team} className={`replay-table-row ${result.result}`}>
                                {props.selectRound
                                    ? <td className="position link" onClick={() => props.selectRound(i+1)}>{props.firstColumn[i]}</td>
                                    : <td className="position">{props.firstColumn[i]}</td>
                                }
                                {isTeamClickable(match.firstTeam, props.itemsToShow)
                                    ? <td className="team link" onClick={() => props.selectItem(match.firstTeam)}>{match.firstTeam}</td>
                                    : <td className="team">{match.firstTeam}</td>
                                }
                                <td className="score">{`${match.firstScore} - ${match.secondScore}`}</td>
                                {isTeamClickable(match.secondTeam, props.itemsToShow)
                                    ? <td className="team link" onClick={() => props.selectItem(match.secondTeam)}>{match.secondTeam}</td>
                                    : <td className="team">{match.secondTeam}</td>
                                }
                            </tr>
                        );
                    }
                })}
            </tbody>
        </table>
    );
}

export default Matches;