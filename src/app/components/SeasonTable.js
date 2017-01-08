import React from 'react';
import FlipMove from 'react-flip-move';
import getPrintableNumber from '../../auxiliary/getPrintableNumber';
import { getRowColor, getRowAnimation, getClassesString } from './auxiliary/styling';


function getTotalText (mode, shouldAnimateChange, change, roundChange, total) {
    if (shouldAnimateChange) {
        return getPrintableNumber(change, true);
    } else {
        switch (mode) {
            case 'changes':
                return getPrintableNumber(roundChange, true);
            case 'season':
                return getPrintableNumber(total);
        }
    }
}

function SeasonTable (props) {
    const shouldAnimateChange = props.isMoving && (props.showChangeDuringAnimation || !props.areRoundsConsecutive);


    return (
        <table className="r-table">
            <thead>
            <tr>
                <th className="position">{props.positionName}</th>
                <th className="item">{props.itemName}</th>
                {Object.keys(props.calculatedColumns).map(key => {
                    return <th key={props.calculatedColumns[key]} className="calculated">{props.calculatedColumns[key]}</th>;
                })}
                {props.extraColumnsNames.map(name => {
                    return <th className="extra" key={name}>{name}</th>;
                })}
                <th className="total">{props.totalName}</th>
            </tr>
            </thead>
            <FlipMove
                delay={props.animationDuration/2}
                duration={props.animationDuration/2}
                typeName='tbody' >

                {[...props.round.results.entries()]
                    .map(([item, result]) => {
                        const classCandidates = [
                            { condition: props.isFocused(item), class: 'focus'}
                        ];

                        const rowStyle = {};

                        if (props.isMoving) {
                            if (props.round.meta.areAllResultsMapped && props.areRoundsConsecutive) {
                                rowStyle.animation = `replay-table-${result.result} ${props.animationDuration}ms`;
                            } else {
                                const isFading = props.mode === 'season' || !props.areRoundsConsecutive;
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
                                className={`row ${getClassesString(classCandidates)}`}
                                onClick={() => props.selectItem(item)}>

                                <td className="position">{result.position}</td>
                                <td className="item">{item}</td>
                                {Object.keys(props.calculatedColumns).map(key =>
                                    <td key={key} className="calculated">{result[key]}</td>
                                )}
                                {props.extraColumnsNames.map(name =>
                                    <td key={name} className="extras">{result.extras[name]}</td>
                                )}
                                <td className="total">{getTotalText(props.mode, shouldAnimateChange,
                                    props.changes.get(item), result.change, result.total)}</td>
                            </tr>
                        );
                    })}
            </FlipMove>
        </table>
    );
}

export default SeasonTable;