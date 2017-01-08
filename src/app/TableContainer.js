import React, { Component } from 'react';
import ControlPanel from './components/ControlPanel';
import SeasonTable from './components/SeasonTable';
import Matches from './components/Matches';
import ItemHistory from './components/ItemHistory';
import './TableContainer.css';


class TableContainer extends Component {
    constructor(props) {
        super(props);
        const changes = this.getChanges.bind(this)(null, this.props.startFromRound);
        this.state = Object.assign({
            currentRound: this.props.startFromRound,
            previousRound: null,
            isPlaying: false,
            isMoving: false,
            selectedItem: null,
            focusedItems: this.props.focusedItems ? new Set([...this.props.focusedItems]) : new Set(),
            mode: 'season'
        }, changes);
    }

    getChanges (previousRound, currentRound) {
        const changes = new Map([...this.props.resultsTable[currentRound].results.entries()].map(([item, result]) => {
            return [item, previousRound === null
                ? result.change
                : result.total - this.props.resultsTable[previousRound].results.get(item).total]
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

    selectItem (item) {
        this.setState({
            selectedItem: item,
            mode: 'item'
        });
    }

    selectRound (round) {
        this.setState({
            currentRound: round,
            mode: this.props.modes.map(mode => mode.value).includes('round') ? 'round' : 'season'
        });
    }

    renderControlPanel () {
        const round = this.props.resultsTable[this.state.currentRound];
        const roundsNames = this.props.resultsTable.map(round => round.meta.name);

        let options, selectedOption, selectOption;
        if (this.state.mode === 'item') {
            options = [...round.results.keys()];
            selectedOption = this.state.selectedItem || round.meta.leader;
            selectOption = (option) => this.setState({selectedItem: option});
        } else {
            options = roundsNames;
            selectedOption = round.meta.name;
            selectOption = (option) => this.goToRound.bind(this)(roundsNames.indexOf(option))
        }


        return (
            <ControlPanel
                playButtonIcon={this.state.isPlaying ? 'pause' : this.state.currentRound === this.props.lastRound ? 'replay' : 'play'}
                play={this.handlePlayButton.bind(this)}

                options={options}
                selectedOption={selectedOption}
                selectOption={selectOption}

                modes={this.props.modes}
                selectedMode={this.state.mode}
                switchMode={mode => this.setState({ mode: mode })}

                showProgressBar={this.props.showProgressBar}
                progressBarValue={this.state.currentRound}
                progressBarMaxValue={this.props.roundsTotalNumber || this.props.resultsTable.length - 1}

                tableName={this.props.tableName} />
        );
    }

    renderTable () {
        const round = this.props.resultsTable[this.state.currentRound];
        switch (this.state.mode) {
            case 'round':
                switch (this.props.roundMode) {
                    case 'matches':
                        return (
                            <Matches
                                firstColumn={[...round.results.values()].map(result => result.position)}
                                results={[...round.results.entries()]}
                                selectItem={this.selectItem.bind(this)}/>
                        );
                    default:
                        return null;
                }
            case 'item':
                const currentItem = this.state.selectedItem || round.meta.leader;
                switch (this.props.roundMode) {
                    case 'matches':
                        return (
                            <Matches
                                firstColumn={this.props.resultsTable.map(round => round.meta.name).slice(1)}
                                results={this.props.resultsTable
                                    .map(round => [currentItem, round.results.get(currentItem)])
                                    .filter(([item, result]) => result.match !== null)}
                                locationFirst="home"
                                selectItem={this.selectItem.bind(this)}
                                selectRound={this.selectRound.bind(this)}/>
                        );
                    default:
                        return (
                            <ItemHistory
                                roundName={this.props.roundName}
                                positionName={this.props.positionName}
                                totalName={this.props.totalName}

                                results={this.props.resultsTable.map(round => [round.meta, round.results.get(currentItem)]).slice(1)}
                                selectRound={this.selectRound.bind(this)}/>
                        );
                }
            default:
                return (
                    <SeasonTable
                        positionName={this.props.positionName}
                        itemName={this.props.itemName}
                        totalName={this.props.totalName}

                        calculatedColumns={this.props.calculatedColumns}
                        extraColumnsNames={this.props.extraColumnsNames}

                        round={round}
                        changes={this.state.changes}
                        maxAbsChange={this.state.maxAbsChange}
                        areRoundsConsecutive={this.state.previousRound === null || Math.abs(this.state.currentRound - this.state.previousRound) === 1}

                        mode={this.state.mode}
                        isMoving={this.state.isMoving}

                        selectItem={this.selectItem.bind(this)}
                        isFocused={item => this.state.focusedItems.size === 0 || this.state.focusedItems.has(item)}

                        animationDuration={this.props.animationDuration}
                        showChangeDuringAnimation={this.props.showChangeDuringAnimation}/>
                );
        }
    }

    render () {
        return (
            <div className="replay-table-wrap">
                {this.renderControlPanel()}
                {this.renderTable()}
            </div>
        );
    }
}

export default TableContainer;
