import React from 'react';
import FlipMove from 'react-flip-move';
import getPrintableNumber from '../../helpers/getPrintableNumber';
import { getRowColor, getRowAnimation, getClassesString } from './helpers/styling';


function getTotalText (mode, shouldAnimateChange, change, roundChange, total, areAllResultsMapped) {
    if (shouldAnimateChange) {
        return getPrintableNumber(change, true);
    } else {
        switch (mode) {
            case 'changes':
                return areAllResultsMapped ? getPrintableNumber(total) : getPrintableNumber(roundChange, true);
            case 'season':
                return getPrintableNumber(total);
        }
    }
}

function SeasonTable (props) {
    const shouldAnimateChange = props.isMoving &&
        (props.showChangeDuringAnimation || !props.areRoundsConsecutive) &&
        props.round.meta.index > 0;

    return (
        <table className="r-table season">
            <thead>
            <tr>
                <th className="position">{props.terms.position}</th>
                <th className="item">{props.terms.item}</th>
                {props.extraColumnsNames.map(name => {
                    return <th className="extra" key={name}>{name}</th>;
                })}
                {Object.keys(props.calculatedColumns).map(key => {
                    return <th key={props.calculatedColumns[key]} className="calculated">{props.calculatedColumns[key]}</th>;
                })}
                <th className="total">{props.terms.total}</th>
            </tr>
            </thead>
            <FlipMove
                delay={props.animationDuration/2}
                duration={props.animationDuration/2}
                typeName='tbody' >

                {[...props.round.results.entries()]
                    .map(([item, result]) => {
                        const classCandidates = [
                            { condition: props.checkFocus(item), class: 'focus'}
                        ];

                        const rowStyle = {};
                        const isFading = props.mode === 'season' || !props.areRoundsConsecutive;

                        if (props.isMoving && props.round.meta.index > 0) {
                            if (props.round.meta.areAllResultsMapped && props.areRoundsConsecutive && result.change !== null) {
                                rowStyle.animation = `replay-table-${result.result}${isFading ? '-fading' : ''} ${props.animationDuration}ms`;
                            } else {
                                const change = props.areRoundsConsecutive ? result.change : props.changes.get(item);
                                rowStyle.animation = getRowAnimation(change, props.maxAbsChange,
                                    props.animationDuration, isFading);
                            }
                        } else if (props.mode === 'changes') {
                            if (props.round.meta.areAllResultsMapped) {
                                classCandidates.push({ condition: true, class: result.result });
                            } else {
                                rowStyle.backgroundColor = getRowColor(result.change, props.round.meta.maxAbsChange);
                            }
                        }

                        return (
                            <tr key={item}
                                style={rowStyle}
                                className={`row ${getClassesString(classCandidates)}`} >

                                <td className="position">{result.position}</td>
                                <td className="item link" onClick={() => props.selectItem(item)}>{item}</td>
                                {props.extraColumnsNames.map(name =>
                                    <td key={name} className="extra">{result.extras[name]}</td>
                                )}
                                {Object.keys(props.calculatedColumns).map(key =>
                                    <td key={key} className="calculated">{result[key]}</td>
                                )}
                                <td className="total">{getTotalText(props.mode, shouldAnimateChange,
                                    props.changes.get(item), result.change, result.total,
                                    props.round.meta.areAllResultsMapped)}</td>
                            </tr>
                        );
                    })}
            </FlipMove>
        </table>
    );
}

export default SeasonTable;