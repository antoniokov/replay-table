import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import getPrintableNumber from '../auxiliary/getPrintableNumber';
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

    getRowStyle (result, change, areRoundsConsecutive) {
        const styleObject = {};
        const resultClass = this.props.resultMapping[result.change];

        const customStyleNeeded = this.state.show === 'round' && !resultClass;
        const animationNeeded = this.state.isMoving && this.state.currentRound > 0;
        const customAnimationNeeded = animationNeeded && (!areRoundsConsecutive || !resultClass);

        let changeIntensity;
        if (customStyleNeeded || customAnimationNeeded) {
            const maxAbsChange = [...this.props.results[this.state.currentRound].entries()].reduce((maxChange, [it, res]) => {
                const ch = this.state.previousRound === undefined
                    ? res.change
                    : res.total - this.props.results[this.state.previousRound].get(it).total;
                return Math.abs(ch) > maxChange ? Math.abs(ch) : maxChange
            }, 0);
            changeIntensity = 10*Math.round(10*Math.abs(change)/maxAbsChange);
        }

        if (!animationNeeded) {
            if (customStyleNeeded) {
                const color = change >= 0 ? '94,179,26' : '179,82,82';
                styleObject.backgroundColor = `rgba(${color},${changeIntensity/100})`;
            }
        } else {
            if (customAnimationNeeded) {
                const color = change >= 0 ? 'green' : 'red';
                styleObject.animation = `${color}-${changeIntensity} ${this.props.animationDuration}ms`
            } else {
                styleObject.animation = `${resultClass} ${this.props.animationDuration}ms`;
            }
        }

        return styleObject;
    }

    getRowClasses (item, result) {
        const classes = ['row'];
        if (this.state.show === 'round' && this.props.resultMapping[result.change]) {
            classes.push(this.props.resultMapping[result.change]);
        }

        if (this.state.focusedItems.size === 0 || this.state.focusedItems.has(item)) {
            classes.push('focus')
        }

        return classes.join(' ');
    }

    getTotalText (result, change, areRoundsConsecutive) {
        if (this.state.currentRound === 0) {
            return result.total;
        }

        const shouldAnimateChange =  this.state.isMoving && (this.props.showChangeDuringAnimation || !areRoundsConsecutive);
        if (shouldAnimateChange) {
            return getPrintableNumber(change);
        } else {
            switch (this.state.show) {
                case 'round':
                    return getPrintableNumber(result.change, true);
                case 'season':
                    return getPrintableNumber(result.total);
            }
        }
    }


    render() {
        return (
            <div className="replay-table-wrap">

                <div className="replay-table-controls">

                    {!this.props.showModeSwitch ? null :
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
                    }


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

                    {!this.props.showProgressBar ? null :
                    <div className="replay-table-progress-wrap">
                         <progress className="replay-table-progress" value={this.state.currentRound} max={this.props.roundsNames.length - 1} />
                    </div>
                    }


                </div>

                <table className="r-table">
                    <thead>
                    <tr>
                        <th className="position">{this.props.positionName}</th>
                        <th className="item">{this.props.itemName}</th>
                        {Object.keys(this.props['calculatedColumns']).map(key => {
                            const name = this.props['calculatedColumns'][key];
                            return <th key={name} className="calculated">{name}</th>;
                        })}
                        {this.props['extraColumnsNames'].map(name => <th className="extra" key={name}>{name}</th>)}
                        <th className="total">{this.props.totalName}</th>
                    </tr>
                    </thead>
                    <FlipMove
                        delay={this.props.animationDuration/2}
                        duration={this.props.animationDuration/2}
                        typeName='tbody' >

                        {[...this.props.results[this.state.currentRound].entries()]
                            .filter(([item, result]) => !this.props['itemsToShow'] || this.props['itemsToShow'].includes(item))
                            .map(([item, result]) => {
                                const areRoundsConsecutive = this.state.previousRound === undefined || Math.abs(this.state.previousRound - this.state.currentRound) === 1;
                                const change = areRoundsConsecutive
                                    ? result.change
                                    : result.total - this.props.results[this.state.previousRound].get(item).total;

                                return (
                                    <tr key={item}
                                        style={this.getRowStyle.bind(this)(result, change, areRoundsConsecutive)}
                                        className={this.getRowClasses.bind(this)(item, result)}
                                        onClick={() => this.highlightRow(item)}>

                                        <td className="position">{result.position}</td>
                                        <td className="item">{item}</td>
                                        {Object.keys(this.props['calculatedColumns']).map(key =>
                                            <td key={key} className="calculated">{result[key]}</td>
                                        )}
                                        {this.props.extraColumnsNames.map(name =>
                                            <td key={name} className="extras">{result.extras[name]}</td>
                                        )}
                                        <td className="total">{this.getTotalText.bind(this)(result, change, areRoundsConsecutive)}</td>
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
