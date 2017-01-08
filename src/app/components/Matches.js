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


function Matches (props) {
    return (
        <table className="replay-table-matches">
            <tbody>
                {props.results.map(([item, result], i) => {
                    if (!result.match) {
                        return (
                            <tr key={props.firstColumn[i] || item} className={`replay-table-row`}>
                                <td className="replay-table-position">{props.firstColumn[i]}</td>
                                <td className="replay-table-team">{item}</td>
                                <td className="replay-table-score">{}</td>
                                <td className="replay-table-team">{}</td>
                            </tr>
                        );
                    } else {
                        const match = getMatch(item, result.match, props.locationFirst);
                        return (
                            <tr key={props.firstColumn[i] || item} className={`replay-table-row ${result.result}`}>
                                <td className="replay-table-position"
                                    onClick={props.selectRound ? () => props.selectRound(i+1) : null}>
                                    {props.firstColumn[i]}
                                </td>
                                <td className="replay-table-team" onClick={() => props.selectItem(match.firstTeam)}>
                                    {match.firstTeam}
                                </td>
                                <td className="replay-table-score">{`${match.firstScore} - ${match.secondScore}`}</td>
                                <td className="replay-table-team" onClick={() => props.selectItem(match.secondTeam)}>
                                    {match.secondTeam}
                                </td>
                            </tr>
                        );
                    }
                })}
            </tbody>
        </table>
    );
}

export default Matches;