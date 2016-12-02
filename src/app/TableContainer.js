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
            this.setState({ isPlaying: true }, () => {
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
        if(this.state.currentRound > 0 && !this.state.isMoving) {
            this.goToRound(this.state.currentRound - 1)
        }
    }

    handleNextButton () {
        if(this.state.currentRound < this.props.lastRound && !this.state.isMoving) {
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
                    <div
                        className={this.state.isPlaying
                            ? 'pause'
                            : this.state.currentRound === this.props.lastRound ? 'replay' : 'play'}
                        onClick={this.handlePlayButton.bind(this)} />

                    <div
                        className={`previous ${this.state.currentRound === 0 || this.state.isMoving ? 'disabled' : ''}`}
                        onClick={this.handlePreviousButton.bind(this)}>
                        &lt;
                    </div>

                    <div
                        className={`next ${this.state.currentRound === this.props.lastRound  || this.state.isMoving? 'disabled' : ''}`}
                        onClick={this.handleNextButton.bind(this)}>
                        &gt;
                    </div>

                    <select onChange={this.handleSelect.bind(this)} value={this.state.currentRound}>
                        {this.props.roundsNames.map((name, i) =>
                            <option key={i} value={i}>{name}</option>)}
                    </select>

                    {this.props.showProgressBar ? <progress value={this.state.currentRound} max={this.props.roundsNames.length - 1} /> : null}
                </div>

                <table className="replay-table">
                    <thead>
                    <tr>
                        <th className="position">{this.props.positionName}</th>
                        <th className="item">{this.props.itemName}</th>
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
                                if (this.state.isMoving && this.state.currentRound > 0) {
                                    styleObject.animation = `${this.props.resultName[result.change]} ${this.props.animationDuration}ms`;
                                }

                                const isFocused = this.state.focusedItems.size === 0 || this.state.focusedItems.has(result.item);
                                const changeString = result.change > 0 ? `+${result.change}` : result.change;
                                const showChange = this.props.showChangeDuringAnimation && this.state.isMoving;

                                return (
                                    <tr key={result.item}
                                        style={styleObject}
                                        className={`row ${isFocused ? 'focus' : ''}`}
                                        onClick={() => this.highlightRow(result.item)}>

                                        <td className="position">{result.position}</td>
                                        <td className="item">{result.item}</td>
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
