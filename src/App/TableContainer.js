import React, { Component } from 'react';


class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRound: props.roundsNames.length - 1,
            isPlaying: false
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
        if(!this.state.isPlaying) {
            this.goToRound(this.state.currentRound - 1);
            return;
        }

        if (this.state.currentRound === this.props.roundsNames.length - 1) {
            this.setState({ isPlaying: false });
            return;
        }

        setTimeout(() => this.goToRound(this.state.currentRound + 1, this.play), 300);
    }

    render() {
        return (
            <div>
                <h3>Standings after {this.props.roundsNames[this.state.currentRound]} games</h3>
                <button onClick={this.handlePlayButton.bind(this)}>{this.state.isPlaying ? 'Pause' : 'Play'}</button>
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
                            <th>{this.props.itemName}</th>
                            <th>Points</th>
                            {this.props.showChange
                                ? <th>Change</th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results[this.state.currentRound]
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
