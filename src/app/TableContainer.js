import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import './TableContainer.css';


class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRound: this.props.startFromRound,
            isPlaying: false,
            focusedItems: this.props.focusedItems ? new Set([...this.props.focusedItems]) : new Set()
        };
    }

    handleSliderChange (e) {
        const round = Number.parseInt(e.target.value, 10);
        if (round !== this.state.currentRound) {
            this.goToRound(round);
        }
    }

    goToRound (roundNumber) {
        this.setState({ isMoving: false }, () => {
            return new Promise(resolve => this.setState({
                previousRound: this.state.currentRound,
                currentRound: roundNumber,
                isMoving: true
            }, resolve));
        });
    }

    handlePlayButton () {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
        } else {
            this.setState({ isPlaying: true }, () => {
                if (this.state.currentRound === this.props.roundsNames.length - 1) {
                    Promise.resolve(this.goToRound(0))
                        .then(() => setTimeout(this.play.bind(this), this.props.animationDuration))
                } else {
                    this.play.bind(this)()
                }
            });
        }
    }

    play () {
        if (this.state.currentRound >= this.props.roundsNames.length - 1) {
            this.setState({ isPlaying: false });
            return;
        }

        if (this.state.isPlaying) {
                Promise.resolve(this.goToRound(this.state.currentRound + 1))
                    .then(() => setTimeout(this.play.bind(this), this.props.animationDuration));
        }
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
                    <h3 className="replay-table-sub-head">Standings after {this.props.roundsNames[this.state.currentRound]} games</h3>

                    <div
                        className={this.state.isPlaying ? 'pause' : 'play'}
                        onClick={this.handlePlayButton.bind(this)} />

                    <div
                        className={`previous ${this.state.currentRound === 0 ? 'disabled' : ''}`}
                        onClick={() => this.state.currentRound > 0 ? this.goToRound(this.state.currentRound - 1) : null}>
                        &lt;
                    </div>

                    <div
                        className={`next ${this.state.currentRound === this.props.roundsNames.length - 1 ? 'disabled' : ''}`}
                        onClick={() => this.state.currentRound < this.props.roundsNames.length - 1 ? this.goToRound(this.state.currentRound + 1) : null}>
                        &gt;
                    </div>

                    <input
                        className="range-line"
                        type="range"
                        name="rounds"
                        autoFocus={true}
                        value={this.state.currentRound}
                        min={0}
                        max={this.props.roundsNames.length - 1}
                        onChange={this.handleSliderChange.bind(this)} />
                </div>

                <table className="replay-table">
                    <thead>
                    <tr>
                        <th className="position">{this.props.positionName}</th>
                        <th className="item">{this.props.itemName}</th>
                        <th className="total">{this.props.totalName}</th>
                        {this.props.showChangeColumn
                            ? <th className="change">&Delta;</th>
                            : null}
                    </tr>
                    </thead>
                    <FlipMove
                        delay={this.props.animationDuration/2 - 100}
                        duration={this.props.animationDuration/2}
                        typeName='tbody'
                        onFinishAll={() => this.setState({ isMoving: false })}>

                        {this.props.results[this.state.currentRound]
                            .map(result => {
                                const styleObject = { 'zIndex': result.position };
                                if (this.state.isMoving && this.state.currentRound > 0) {
                                    styleObject.animation = `${this.props.resultName[result.change]} ${this.props.animationDuration}ms`;
                                }

                                const isFocused = this.state.focusedItems.size === 0 || this.state.focusedItems.has(result.item);

                                return (
                                    <tr key={result.item}
                                        style={styleObject}
                                        className={`row ${isFocused ? 'focus' : ''}`}
                                        onClick={() => this.highlightRow(result.item)}>

                                        <td className="position">{result.position}</td>
                                        <td className="item">{result.item}</td>
                                        <td className="total">{result.total}</td>
                                        {this.props.showChangeColumn
                                            ? <td className="change">{result.change > 0 ? `+${result.change}` : result.change}</td>
                                            : null}
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
