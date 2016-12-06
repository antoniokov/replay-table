import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import './TableContainer.css';


class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRound: this.props.startFromRound,
            isPlaying: false,
            focusedItems: this.props.focusedItems ? new Set([...this.props.focusedItems]) : new Set(),
            show: 'season'
        };
    }

    getChange (result) {
        const areRoundsConsecutive = this.state.previousRound === undefined || Math.abs(this.state.previousRound - this.state.currentRound) === 1;
        if (areRoundsConsecutive || !this.state.isMoving) {
            return result.change;
        } else {
            const previousResult = this.props.results[this.state.previousRound]
                .filter(res => res.item === result.item)[0].total;
            return result.total - previousResult;
        }
    }

    goToRound (roundNumber) {
        this.setState({ isMoving: false }, () => {
            return new Promise(resolve => this.setState({
                previousRound: this.state.currentRound,
                currentRound: roundNumber,
                isMoving: true
            }, () => setTimeout(() => this.setState({ isMoving: false }, resolve), this.props.animationDuration)));
        });
    }

    play () {
        if (this.state.currentRound >= this.props.lastRound) {
            this.setState({ isPlaying: false });
            return;
        }

        if (this.state.isPlaying) {
            const timeout = this.props.showChangeDuringAnimation ? this.props.animationDuration*2 : this.props.animationDuration;
            Promise.resolve(this.goToRound(this.state.currentRound + 1))
                .then(() => setTimeout(this.play.bind(this), timeout));
        }
    }

    handlePlayButton () {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
        } else {
            this.setState({ isPlaying: true, show: 'season' }, () => {
                if (this.state.currentRound === this.props.lastRound) {
                    const timeout = this.props.showChangeDuringAnimation ? this.props.animationDuration*2 : this.props.animationDuration;
                    Promise.resolve(this.goToRound(0))
                        .then(() => setTimeout(this.play.bind(this), timeout))
                } else {
                    this.play.bind(this)()
                }
            });
        }
    }

    handlePreviousButton () {
        if(this.state.currentRound > 0) {
            this.goToRound(this.state.currentRound - 1)
        }
    }

    handleNextButton () {
        if(this.state.currentRound < this.props.lastRound) {
            this.goToRound(this.state.currentRound + 1);
        }
    }

    handleSelect (e) {
        this.goToRound(Number.parseInt(e.target.value, 10));
    }

    highlightRow (item) {
        const newFocusedItems = this.state.focusedItems;
        if (newFocusedItems.has(item)) {
            newFocusedItems.delete(item)
        } else {
            newFocusedItems.add(item);
        }
        this.setState({ focusedItems: newFocusedItems });
    }


    render() {
        return (
            <div className="replay-table-wrap">

                <div className="replay-table-controls">

                    <div className="replay-table-check">

                        <input type="radio"
                               id={`${this.props.tableName || ''}-season-radio`}
                               name={`${this.props.tableName || ''}seasonRoundSwitch`}
                               value="season"
                               checked={this.state.show === 'season'}
                               onChange={() => this.setState({ show: 'season' })} />
                        <label  htmlFor={`${this.props.tableName || ''}-season-radio`}>
                            {this.props.seasonName}
                        </label>

                        <input type="radio"
                               id={`${this.props.tableName || ''}-round-radio`}
                               name={`${this.props.tableName || ''}seasonRoundSwitch`}
                               value="round"
                               checked={this.state.show === 'round'}
                               onChange={() => this.setState({ show: 'round' })} />
                        <label  htmlFor={`${this.props.tableName || ''}-round-radio`}>
                            {this.props.roundName}
                        </label>

                    </div>

                    <div className="replay-table-controls-left">

                        <div className="replay-table-start-control">
                            <div
                                className={this.state.isPlaying
                            ? 'pause'
                            : this.state.currentRound === this.props.lastRound ? 'replay' : 'play'}
                                onClick={this.handlePlayButton.bind(this)} />
                        </div>

                        <div
                            className={`previous ${this.state.currentRound === 0? 'disabled' : ''}`}
                            onClick={this.handlePreviousButton.bind(this)}>
                            &lt;
                        </div>

                        <div
                            className={`next ${this.state.currentRound === this.props.lastRound? 'disabled' : ''}`}
                            onClick={this.handleNextButton.bind(this)}>
                            &gt;
                        </div>

                        <select className="replay-table-select" onChange={this.handleSelect.bind(this)} value={this.state.currentRound}>
                            {this.props.roundsNames.map((name, i) =>
                                <option key={i} value={i}>{name}</option>)}
                        </select>

                    </div>

                    <div className="replay-table-progress-wrap">
                        {this.props.showProgressBar ? <progress className="replay-table-progress" value={this.state.currentRound} max={this.props.roundsNames.length - 1} /> : null}
                    </div>


                </div>

                <table className="r-table">
                    <thead>
                    <tr>
                        <th className="position">{this.props.positionName}</th>
                        <th className="item">{this.props.itemName}</th>
                        {this.props['extraColumnsNames'].map(name => <th className="extra" key={name}>{name}</th>)}
                        <th className="total">{this.props.totalName}</th>
                    </tr>
                    </thead>
                    <FlipMove
                        delay={this.props.animationDuration/2}
                        duration={this.props.animationDuration/2}
                        typeName='tbody' >

                        {this.props.results[this.state.currentRound]
                            .map(result => {
                                const styleObject = { 'zIndex': result.position };
                                const areRoundsConsecutive = this.state.previousRound === undefined || Math.abs(this.state.previousRound - this.state.currentRound) === 1;

                                const shouldAnimate = this.state.isMoving && this.state.currentRound > 0;
                                const resultClass = this.props.resultName[result.change] || '';
                                if (shouldAnimate && areRoundsConsecutive && resultClass) {
                                    styleObject.animation = `${resultClass} ${this.props.animationDuration}ms`;
                                }

                                const isFocused = this.state.focusedItems.size === 0 || this.state.focusedItems.has(result.item);

                                const showChange = this.state.currentRound !== 0 &&
                                    (this.state.show === 'round' || (this.state.isMoving && (this.props.showChangeDuringAnimation || !areRoundsConsecutive)));

                                const change = this.getChange(result);
                                const changeString = change > 0 ? `+${change}` : change;

                                const maxAbsChange = this.props.results[this.state.currentRound].reduce((maxChange, result) => {
                                    const absChange = Math.abs(this.getChange(result));
                                    return absChange > maxChange ? absChange : maxChange
                                }, 0);
                                if (this.state.currentRound !== 0 && ((this.state.show === 'round' && !resultClass))) {
                                    styleObject.backgroundColor = `rgba(105,189,36,${Math.abs(change)/maxAbsChange})`;
                                }
                                if (shouldAnimate && (!areRoundsConsecutive || !resultClass)) {
                                    const percent = 10*Math.round(10*Math.abs(change)/maxAbsChange);
                                    styleObject.animation = `continuous-${percent} ${this.props.animationDuration}ms`
                                }

                                return (
                                    <tr key={result.item}
                                        style={styleObject}
                                        className={`row ${isFocused ? 'focus' : ''} ${this.state.show === 'round' ? resultClass : ''}`}
                                        onClick={() => this.highlightRow(result.item)}>

                                        <td className="position">{result.position}</td>
                                        <td className="item">{result.item}</td>
                                        {this.props.extraColumnsNames.map(name =>
                                            <td key={name} className="extras">{result.extras[name]}</td>
                                        )}
                                        <td className="total">{showChange ? changeString : result.total}</td>
                                    </tr>
                                );
                            })}
                    </FlipMove>
                </table>
            </div>
        );
    }
}

export default TableContainer;
