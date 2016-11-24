import React, { Component } from 'react';

class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: props.itemName,
            roundsNames: props.roundsNames,
            results: props.results,
            currentRound: props.roundsNames.length - 1
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
        const reset = this.state.currentRound === this.props.roundsNames.length - 1;
        this.setState({ playButtonPressed: true}, this.play(reset))
    }

    play (reset) {
        if (reset) {
            this.goToRound(0, this.play);
            return;
        }

        if (this.state.currentRound <= this.props.roundsNames.length - 2) {
            setTimeout(() => this.goToRound(this.state.currentRound + 1, this.play), 300);
        }
    }

    render() {
        return (
            <div>
                <h3>Standings after {this.state.roundsNames[this.state.currentRound]} games</h3>
                <button onClick={this.handlePlayButton.bind(this)}>Play</button>
                <input
                 type="range"
                 name="rounds"
                 value={this.state.currentRound}
                 min={0}
                 max={this.state.roundsNames.length - 1}
                 onChange={this.handleSliderChange.bind(this)}/>
                <table>
                    <thead>
                        <tr>
                            <th>{this.state.itemName}</th>
                            <th>Points</th>
                            {this.props.showChange
                                ? <th>Change</th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results[this.state.currentRound].sort((a,b) => b.total - a.total)
                            .map(result => {
                                return (
                                    <tr key={result.item}>
                                        <th>{result.item}</th>
                                        <th>{result.total}</th>
                                        {this.props.showChange
                                            ? <th>{result.change > 0 ? `+${result.change}` : result.change}</th>
                                            : null}
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableContainer;
