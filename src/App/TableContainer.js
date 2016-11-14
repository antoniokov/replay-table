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

    goToRound (e) {
        this.setState({
            previousRound: this.state.currentRound,
            currentRound: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h3>Standings after {this.state.roundsNames[this.state.currentRound]} games</h3>
                <input
                 type="range"
                 name="rounds"
                 value={this.state.currentRound}
                 min={0}
                 max={this.state.roundsNames.length - 1}
                 onChange={this.goToRound.bind(this)}/>
                <table>
                    <thead>
                        <tr>
                            <th>{this.state.itemName}</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results[this.state.currentRound].sort((a,b) => b.total - a.total)
                            .map(result => {
                                return (
                                    <tr key={result.item}>
                                        <th>{result.item}</th>
                                        <th>{result.total}</th>
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
