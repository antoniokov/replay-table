import React from 'react';
import getPrintableNumber from '../../auxiliary/getPrintableNumber.js';


function ItemHistory (props) {
    return (
        <table className="replay-table-item-history">
            <thead>
                <tr>
                    <th>{props.roundName}</th>
                    <th>&Delta;</th>
                    <th>{props.totalName}</th>
                    <th>{props.positionName}</th>
                </tr>
            </thead>
            <tbody>
                {props.results.map(([round, result], i) => {
                    return (
                        <tr key={round} className="replay-table-row" onClick={() => props.selectRound(i+1)}>
                            <td>{round}</td>
                            <td>{getPrintableNumber(result.change, true)}</td>
                            <td>{result.total}</td>
                            <td>{result.position}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default ItemHistory;