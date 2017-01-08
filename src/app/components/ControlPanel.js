import React from 'react';


function ControlPanel (props) {
    const selectedOptionIndex = props.options.indexOf(props.selectedOption);
    return (
        <div className="replay-table-controls">

            {props.modes.length <= 1 ? null :
                <div className="replay-table-check">
                    {props.modes.map(mode => {
                        return(
                            <div key={mode.value} className="replay-table-mode-option">
                                <input type="radio"
                                       id={`${props.tableName || ''}-${mode.value}-radio`}
                                       name={`${props.tableName || ''}-mode-switch`}
                                       value={mode.value}
                                       checked={mode.value === props.selectedMode}
                                       onChange={() => props.switchMode(mode.value)} />

                                <label htmlFor={`${props.tableName || ''}-${mode.value}-radio`}>
                                    {mode.label}
                                </label>
                            </div>
                        );
                    })}

                </div>
            }

            <div className="replay-table-controls-left">

                <div className="replay-table-start-control">
                    <div
                        className={props.playButtonIcon}
                        onClick={props.play} />
                </div>

                <div
                    className={`previous ${selectedOptionIndex === 0 ? 'disabled' : ''}`}
                    onClick={() => selectedOptionIndex > 0
                        ? props.selectOption(props.options[selectedOptionIndex - 1])
                        : null}>
                    &lt;
                </div>

                <div
                    className={`next ${selectedOptionIndex === props.options.length - 1 ? 'disabled' : ''}`}
                    onClick={() => selectedOptionIndex < props.options.length - 1
                        ? props.selectOption(props.options[selectedOptionIndex + 1])
                        : null}>
                    &gt;
                </div>

                <select
                    className="replay-table-select"
                    onChange={event => props.selectOption(event.target.value)}
                    value={props.selectedOption} >
                    
                    {props.options.map(option =>
                        <option key={option} value={option}>{option}</option>)}
                </select>

            </div>

            {!props.showProgressBar ? null :
                <div className="replay-table-progress-wrap">
                    <progress
                        className="replay-table-progress"
                        value={props.progressBarValue}
                        max={props.progressBarMaxValue} />
                </div>
            }
        </div>
    );
}

export default ControlPanel;