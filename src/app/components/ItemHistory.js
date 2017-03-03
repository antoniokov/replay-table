import React from 'react';
import getPrintableNumber from '../../helpers/getPrintableNumber.js';
import { getRowColor, getClassesString } from './helpers/styling';


function ItemHistory (props) {
    return (
        <table className="r-table item-history">
            <thead>
                <tr>
                    <th className="round">{props.terms.round}</th>
                    <th className="change">{props.terms.change}</th>
                    <th className="total">{props.terms.total}</th>
                    <th className="position">{props.terms.position}</th>
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
                            className={`replay-table-row ${getClassesString(classCandidates)}`} >

                            <td className="round link" onClick={() => props.selectRound(i+1)}>{roundMeta.name}</td>
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