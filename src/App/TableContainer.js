import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import './TableContainer.css';


class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRound: props.roundsNames.length - 1,
            isPlaying: false,
            focusedItems: new Set()
        };
    }

    handleSliderChange (e) {
        this.goToRound(Number.parseInt(e.target.value, 10));
    }

    goToRound (roundNumber, callback) {
        this.setState({
            previousRound: this.state.currentRound,
            currentRound: roundNumber
        }, callback);
    }

    handlePlayButton () {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
        } else {
            const reset = this.state.currentRound === this.props.roundsNames.length - 1;
            this.setState({ isPlaying: true }, () => reset ? this.goToRound(0, this.play) : this.play());
        }
    }

    play () {
        if (this.state.currentRound === this.props.roundsNames.length - 1) {
            this.setState({ isPlaying: false });
            return;
        }


        setTimeout(() => this.state.isPlaying ? this.goToRound(this.state.currentRound + 1, this.play) : null, 1000);
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

    getResultClass (change) {
        if (this.state.currentRound === 0){
            return '';
        }

        switch (change) {
            case 3:
                return 'victory';
            case 1:
                return 'draw';
            case 0:
                return 'defeat';
            default:
                return '';
        }
    }

    getFocusClass (item) {
        return this.state.focusedItems.has(item) ? 'focus' : '';
    }

    renderItems () {
        return this.props.results[this.state.currentRound]
            .map(result => {
                return (
                    <tr key={result.item}
                        className={`${this.getResultClass(result.change)} ${this.getFocusClass(result.item)}`}
                        onClick={() => this.highlightRow(result.item)}>

                        {<th className="position">{result.position}</th>}
                        <th className="item">{result.item}</th>
                        <th className="total">{result.total}</th>
                        {this.props.showChange
                            ? <th className="change">{result.change > 0 ? `+${result.change}` : result.change}</th>
                            : null}
                    </tr>
                );
            });
    }

    render() {
        return (
            <div>
                <h3>Standings after {this.props.roundsNames[this.state.currentRound]} games</h3>
                <div
                    className={this.state.isPlaying ? 'pause' : 'play'}
                    onClick={this.handlePlayButton.bind(this)}/>
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
                 type="range"
                 name="rounds"
                 value={this.state.currentRound}
                 min={0}
                 max={this.props.roundsNames.length - 1}
                 onChange={this.handleSliderChange.bind(this)}/>
                <table>
                    <thead>
                    <tr>
                        <th className="position">#</th>
                        <th className="item">{this.props.itemName}</th>
                        <th className="total">Pts</th>
                        {this.props.showChange
                            ? <th className="change">&Delta;</th>
                            : null}
                    </tr>
                    </thead>
                    <FlipMove duration="500" delay="500">
                        {this.renderItems()}
                    </FlipMove>
                </table>
            </div>
        );
    }
}

export default TableContainer;
