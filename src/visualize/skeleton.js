import * as Controls from './controls';
import adjustDurations from './helpers/adjust-durations';
import getRowsYs from './helpers/get-rows-ys';
import toCamelCase from '../helpers/general/to-camel-case';


const dispatchers = ['roundChange', 'play', 'pause', 'roundPreview', 'endPreview', 'drillDown', 'endDrillDown'];


export default class {
    constructor (data, params) {
        this.data = data;
        this.params = params;

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.preview = this.preview.bind(this);
        this.endPreview = this.endPreview.bind(this);
        this.drillDown = this.drillDown.bind(this);
        this.endDrillDown = this.endDrillDown.bind(this);

        this.durations = adjustDurations(params.durations, params.animationSpeed);

        this.roundsTotalNumber = this.params.roundsTotalNumber || this.data.meta.lastRound;
        this.currentRound = params.startFromRound === null ? this.data.meta.lastRound : params.startFromRound;
        this.previewedRound = null;
        this.drilldown = {};

        this.dispatch = d3.dispatch(...dispatchers);
        this.dispatch.on('roundChange', roundMeta => this.currentRound = roundMeta.index);
        this.dispatch.on('play', () => this.isPlaying = true);
        this.dispatch.on('pause', () => this.isPlaying = false);

        this.dispatch.on('roundPreview', roundMeta => this.previewedRound = roundMeta.index);
        this.dispatch.on('endPreview', roundMeta => this.previewedRound = null);
        this.dispatch.on('drillDown', item => {
            this.tableContainer.classed('drilldowned', true);
            this.drilldown.item = item
        });
        this.dispatch.on('endDrillDown', item => {
            this.tableContainer.classed('drilldowned', false);
            this.drilldown = {}
        });

        this.selector = params.id ? `#${params.id}` : '.replayTable';

        this.controlsContainer = d3.select(this.selector)
            .append('div')
            .attr('class', `controls-container ${params.visualizer}`);
        this.controls = this.renderControls(this.controlsContainer, this.params.controls);

        this.tableContainer = d3.select(this.selector)
            .append('div')
            .attr('class', `table-container ${params.visualizer}`);
        [this.table, this.rows, this.cells] = this.renderTable(this.data.results[this.currentRound].results);
        this.ys = this.rows.nodes().map(n => n.getBoundingClientRect().top);
        this.initialPositions = this.data.results[this.currentRound].results
            .reduce((obj, res) => Object.assign(obj, { [res.item]: res.position.strict - 1 }) , {});
    }

    renderControls(container, list) {
        const controls = container.append('div')
            .attr('class', 'controls');

        const roundMeta = this.data.results[this.currentRound].meta;

        const controlsObject = {};
        const args = {
            play: [controls, roundMeta, this.play, this.pause],
            previous: [controls, roundMeta, this.previous],
            next: [controls, roundMeta, this.next],
            slider: [controls, this.data.meta.lastRound, this.roundsTotalNumber, roundMeta, this.preview, this.endPreview]
        };
        list.forEach(control => controlsObject[control] = new Controls[control](...args[control]));

        Object.keys(controlsObject).forEach(ctrl => {
            const control = controlsObject[ctrl];
            dispatchers.forEach(dispatcher => {
                const method = toCamelCase(`on-${dispatcher}`);
                if (control[method]) {
                    this.dispatch.on(`${dispatcher}.${ctrl}`, control[method].bind(control));
                }
            });
        });

        return controls;
    }

    move (roundIndex, delay, duration, cells = this.cells) {
        const nextPositions = this.data.results[roundIndex].results
            .reduce((obj, res) => Object.assign(obj, { [res.item]: res.position.strict - 1 }) , {});

        return new Promise((resolve, reject) => {
            let transitionsFinished = 0;
            cells.transition()
                .delay(delay)
                .duration(duration)
                .style('transform', cell => {
                    const initialY = this.ys[this.initialPositions[cell.result.item]];
                    const nextY = this.ys[nextPositions[cell.result.item]];
                    return `translateY(${nextY - initialY}px)`;
                })
                .each(() => ++transitionsFinished)
                .on('end', () => {
                    if (!--transitionsFinished) {
                        resolve();
                    }
                });
        });
    }


    first () {
        return this.to(0);
    }

    last () {
        return this.to(this.data.meta.lastRound);
    }

    previous () {
        if (this.currentRound > 0) {
            return this.to(this.currentRound - 1);
        }
    }

    next () {
        if (this.currentRound < this.data.meta.lastRound) {
            return this.to(this.currentRound + 1);
        }
    }

    play (stopAt = this.data.meta.lastRound) {
        this.dispatch.call('play');

        const playFunction = () => {
            if (this.currentRound === stopAt || !this.isPlaying) {
                this.pause();
            } else {
                Promise.resolve(this.next())
                    .then(() => setTimeout(playFunction, this.durations.freeze));
            }
        };

        if (this.currentRound === this.data.meta.lastRound) {
            Promise.resolve(this.first())
                .then(() => setTimeout(playFunction, this.durations.freeze))
        } else {
            Promise.resolve(this.next())
                .then(() => setTimeout(playFunction, this.durations.freeze))
        }
    }

    pause () {
        this.dispatch.call('pause');
    }

    endPreview (move = false) {
        const end = () => {
            this.dispatch.call('endPreview', this, this.data.results[this.currentRound].meta);
            return Promise.resolve();
        };

        if (this.previewedRound === null || this.previewedRound === this.currentRound) {
            return end();
        } else if (!move) {
            return Promise.resolve(this.preview(this.currentRound))
                .then(end);
        } else {
            return Promise.resolve(this.to(this.previewedRound))
                .then(end);
        }
    }
};
