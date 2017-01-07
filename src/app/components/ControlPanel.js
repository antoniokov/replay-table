import React from 'react';


function ControlPanel (props) {
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
                                       checked={props.mode === mode.value}
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
                        className={props.isPlaying
                            ? 'pause'
                            : props.currentRound === props.lastRound ? 'replay' : 'play'}
                        onClick={props.handlePlayButton} />
                </div>

                <div
                    className={`previous ${props.currentRound === 0? 'disabled' : ''}`}
                    onClick={() => props.currentRound > 0 ? props.goToRound(props.currentRound - 1) : null}>
                    &lt;
                </div>

                <div
                    className={`next ${props.currentRound === props.lastRound? 'disabled' : ''}`}
                    onClick={() => props.currentRound < props.lastRound ? props.goToRound(props.currentRound + 1) : null}>
                    &gt;
                </div>

                <select
                    className="replay-table-select"
                    onChange={event => props.handleSelect(event.target.value)}
                    value={props.currentRound} >
                    
                    {props.roundsNames.map((name, i) =>
                        <option key={i} value={i}>{name}</option>)}
                </select>

            </div>

            {!props.showProgressBar ? null :
                <div className="replay-table-progress-wrap">
                    <progress
                        className="replay-table-progress"
                        value={props.currentRound}
                        max={props.roundsTotalNumber || props.roundsNames.length - 1} />
                </div>
            }
        </div>
    );
}

export default ControlPanel;