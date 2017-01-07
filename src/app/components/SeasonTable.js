import React from 'react';
import FlipMove from 'react-flip-move';
import getPrintableNumber from '../../auxiliary/getPrintableNumber';


function getRowStyle (isMoving, styleParams, result, change, maxAbsChange, roundChange, maxAbsRoundChange) {
    const styleObject = {};

    if (!isMoving) {
        if (styleParams.customStyleNeeded) {
            const color = roundChange >= 0 ? '94,179,26' : '179,82,82';
            const changeIntensity = roundChange
                ? Math.max(Math.round(10*Math.abs(roundChange)/maxAbsRoundChange)/10, 0.1)
                : 0;
            styleObject.backgroundColor = `rgba(${color},${changeIntensity})`;
        }
    } else {
        if (styleParams.customAnimationNeeded) {
            const color = change >= 0 ? 'green' : 'red';
            const changeIntensity = change
                ? Math.max(10*Math.round(10*Math.abs(change)/maxAbsChange), 0.1)
                : 0;
            styleObject.animation = `${color}-${changeIntensity} ${styleParams.animationDuration}ms`
        } else {
            styleObject.animation = `${result} ${styleParams.animationDuration}ms`;
        }
    }

    return styleObject;
}

function getTotalText (mode, shouldAnimateChange, change, roundChange, total) {
    if (shouldAnimateChange) {
        return getPrintableNumber(change, true);
    } else {
        switch (mode) {
            case 'round':
                return getPrintableNumber(roundChange, true);
            case 'season':
                return getPrintableNumber(total);
        }
    }
}

function SeasonTable (props) {
    const allResultsMapped = [...props.results.entries()].every(([item, result]) => !!result.result);
    const maxAbsRoundChange = Math.max(...[...props.results.entries()].map(([item, result]) => Math.abs(result.change)));

    const styleParams = {
        customStyleNeeded: props.mode === 'round' && !allResultsMapped,
        customAnimationNeeded: props.isMoving && (!props.areRoundsConsecutive || !allResultsMapped),
        shouldAnimateChange:  props.isMoving && (props.showChangeDuringAnimation || !props.areRoundsConsecutive),
        animationDuration: props.animationDuration
    };

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

                {[...props.results.entries()]
                    .map(([item, result]) => {
                        const classCandidates = [
                            { condition: props.mode === 'round', class: result.result || '' },
                            { condition: props.isFocused(item), class: 'focus'}
                        ];
                        const rowClasses = classCandidates
                            .filter(element => element.condition)
                            .map(element => element.class)
                            .join(' ');

                        return (
                            <tr key={item}
                                style={getRowStyle(props.isMoving, styleParams, result.result, props.changes.get(item),
                                    props.maxAbsChange, result.change, maxAbsRoundChange) }
                                className={rowClasses}
                                onClick={() => props.switchFocus(item)}>

                                <td className="position">{result.position}</td>
                                <td className="item">{item}</td>
                                {Object.keys(props.calculatedColumns).map(key =>
                                    <td key={key} className="calculated">{result[key]}</td>
                                )}
                                {props.extraColumnsNames.map(name =>
                                    <td key={name} className="extras">{result.extras[name]}</td>
                                )}
                                <td className="total">{getTotalText(props.mode, styleParams.shouldAnimateChange,
                                    props.changes.get(item), result.change, result.total)}</td>
                            </tr>
                        );
                    })}
            </FlipMove>
        </table>
    );
}

export default SeasonTable;