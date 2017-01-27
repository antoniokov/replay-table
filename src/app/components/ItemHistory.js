import React from 'react';
import getPrintableNumber from '../../auxiliary/getPrintableNumber.js';
import { getRowColor, getClassesString } from './auxiliary/styling';


function ItemHistory (props) {
    return (
        <table className="r-table replay-table-item-history">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{props.roundName}</th>
                    <th>&Delta;</th>
                    <th>{props.totalName}</th>
                    <th>{props.positionName}</th>
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

                            <td>{i}</td>
                            <td>{roundMeta.name}</td>
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