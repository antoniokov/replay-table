import React from 'react';
import getPrintableNumber from '../../auxiliary/getPrintableNumber.js';
import { getRowColor, getClassesString } from './auxiliary/styling';


function ItemHistory (props) {
    return (
        <table className="r-table item-history">
            <thead>
                <tr>
                    <th className="round">{props.roundName}</th>
                    <th className="change">Change</th>
                    <th className="total">{props.totalName}</th>
                    <th className="position">{props.positionName}</th>
                </tr>
            </thead>
            <tbody>
                {props.results.map(([roundMeta, result], i) => {
                    const classCandidates = [];
                    const rowStyle = {};

                    if (roundMeta.areAllResultsMapped) {
                        classCandidates.push({ condition: true, class: result.result });
                    } else {
                        rowStyle.backgroundColor = getRowColor(result.change, roundMeta.maxAbsChange);
                    }

                    return (
                        <tr key={roundMeta.name}
                            style={rowStyle}
                            className={`replay-table-row ${getClassesString(classCandidates)}`}
                            onClick={() => props.selectRound(i+1)} >

                            <td className="round">{roundMeta.name}</td>
                            <td className="change">{getPrintableNumber(result.change, true)}</td>
                            <td className="total">{result.total}</td>
                            <td className="position">{result.position}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default ItemHistory;