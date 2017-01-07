import React, { Component } from 'react';
import ControlPanel from './components/ControlPanel';
import SeasonTable from './components/SeasonTable';
import './TableContainer.css';


class TableContainer extends Component {
    constructor(props) {
        super(props);
        const changes = this.getChanges.bind(this)(null, this.props.startFromRound);
        this.state = Object.assign({
            currentRound: this.props.startFromRound,
            previousRound: null,
            isPlaying: false,
            focusedItems: this.props.focusedItems ? new Set([...this.props.focusedItems]) : new Set(),
            mode: 'season'
        }, changes);
    }

    getChanges (previousRound, currentRound) {
        const changes = new Map([...this.props.results[currentRound].entries()].map(([item, result]) => {
            return [item, previousRound === null ? result.change : result.total - this.props.results[previousRound].get(item).total]
        }));

        return {
            changes: changes,
            maxAbsChange: Math.max(...[...changes.entries()].map(([item, change]) => Math.abs(change)))
        }
    }

    goToRound (roundNumber) {
        this.setState({ isMoving: false }, () => {
            const changes = this.getChanges.bind(this)(this.state.currentRound, roundNumber);
            return new Promise(resolve => this.setState(Object.assign({
                previousRound: this.state.currentRound,
                currentRound: roundNumber,
                isMoving: true
            }, changes), () => {
                return setTimeout(() => this.setState({ isMoving: false }, resolve), this.props.animationDuration);
            }));
        });
    }

    handlePlayButton () {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
        } else {
            this.setState({ isPlaying: true, mode: 'season' }, () => {
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

    switchFocus (item) {
        const newFocusedItems = this.state.focusedItems;
        if (newFocusedItems.has(item)) {
            newFocusedItems.delete(item)
        } else {
            newFocusedItems.add(item);
        }
        this.setState({ focusedItems: newFocusedItems });
    }

    renderTable () {
        return (
            <SeasonTable
                positionName={this.props.positionName}
                itemName={this.props.itemName}
                totalName={this.props.totalName}

                calculatedColumns={this.props.calculatedColumns}
                extraColumnsNames={this.props.extraColumnsNames}

                results={this.props.results[this.state.currentRound]}
                changes={this.state.changes}
                maxAbsChange={this.state.maxAbsChange}
                areRoundsConsecutive={this.state.previousRound === null || Math.abs(this.state.currentRound - this.state.previousRound) === 1}

                mode={this.state.mode}
                isMoving={this.state.isMoving}

                switchFocus={this.switchFocus}
                isFocused={item => this.state.focusedItems.size === 0 || this.state.focusedItems.has(item)}
                animationDuration={this.props.animationDuration}
                showChangeDuringAnimation={this.props.showChangeDuringAnimation} />
        );
    }

    render () {
        return (
            <div className="replay-table-wrap">
                <ControlPanel
                    currentRound={this.state.currentRound}
                    lastRound={this.props.lastRound}
                    roundsNames={this.props.roundsNames}
                    roundsTotalNumber={this.props.roundsTotalNumber}

                    goToRound={this.goToRound.bind(this)}
                    handlePlayButton={this.handlePlayButton.bind(this)}
                    isPlaying={this.state.isPlaying}

                    mode={this.state.mode}
                    modes={this.props.modes}
                    switchMode={mode => this.setState({ mode: mode })}

                    tableName={this.props.tableName}
                    showProgressBar={this.props.showProgressBar} />

                {this.renderTable()}
            </div>
        );
    }
}

export default TableContainer;
