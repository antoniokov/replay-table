import Skeleton from '../skeleton';
import skeletonCell from '../cell';
import numberToChange from '../../helpers/general/number-to-change';
import isBetween from '../../helpers/general/is-between';
import getItemResults from '../../helpers/data/get-item-results';
import getSparkColor from '../helpers/sparklines/get-spark-color';
import getSparkClasses from '../helpers/sparklines/get-spark-classes';


const columns = {
    left: ['position', 'item'],
    right: ['score', 'opponent', 'points.change', 'equal', 'points', 'pointsLabel'],
    drilldown: ['score', 'opponent', 'wins', 'draws', 'losses', 'labeledPoints']
};

export default class extends Skeleton {
    constructor (data, params) {
        super(data, params);

        this.durations.scale = d3.scaleLinear()
            .domain([1, data.meta.lastRound])
            .range([this.durations.move, 1.5*this.durations.move]);

        ['right', 'slider', 'sparks'].forEach(el => this[el].roundIndex = this.currentRound);
    }

    renderTable (data, classes = ['main']) {
        this.left = {};
        this.sparks = {};
        this.right = {};
        this.slider = {};

        this.left.columns = columns.left;
        this.right.columns = columns.right;

        [this.left.table, this.left.rows, this.left.cells] = this.makeTable(data, [...classes, 'left'], this.left.columns);
        [this.sparks.table, this.sparks.rows, this.sparks.cells] = this.makeSparks(data);
        [this.right.table, this.right.rows, this.right.cells] = this.makeTable(data, [...classes, 'right'], this.right.columns);

        this.sparks.width = this.sparks.rows.node().offsetWidth - this.sparks.cells.node().offsetWidth;

        this.scale = d3.scaleLinear()
            .domain([1, this.data.meta.lastRound])
            .range([0, this.sparks.width])
            .clamp(true);

        this.moveRightTable(this.currentRound);

        this.slider.top = this.makeSlider('top');
        this.slider.bottom = this.makeSlider('bottom');

        this.right.table.call(d3.drag()
            .on("start", () => {
                this.right.drag = {
                    x: d3.event.x,
                    roundIndex: this.right.roundIndex
                };
            })
            .on("drag", () => {
                const difference = Math.abs(this.right.drag.x - d3.event.x);
                const sign = Math.sign(this.right.drag.x - d3.event.x);
                const index = this.right.drag.roundIndex - sign*Math.round(this.scale.invert(difference)) + 1;
                const roundIndex = Math.min(Math.max(index, 1), this.data.meta.lastRound);

                this.moveRightTable(roundIndex);
                this.preview(roundIndex);
            })
            .on("end", () => this.endPreview(true))
        );

        return ['table', 'rows', 'cells'].map(el => {
            const nodes = ['left', 'sparks', 'right'].map(part => this[part][el].nodes());
            return d3.selectAll(d3.merge(nodes));
        });
    }

    makeTable (data, classes, columns) {
        const table = this.tableContainer
            .append('table')
            .attr('class', classes.join(' '));

        const tbody = table.append('tbody');
        const rows = tbody.selectAll('tr')
            .data(data, k => k.item)
            .enter().append('tr');

        const cells = rows.selectAll('td')
            .data(result => columns.map(column => new Cell(column, result, this.params)))
            .enter().append('td')
            .attr('class', cell => cell.classes.join(' '))
            .style('color', cell => cell.color)
            .text(cell => cell.text);

        cells.filter('.clickable')
            .on('click', cell => {
                switch(cell.column) {
                    case 'item':
                        if (this.drilldown.item !== cell.result.item) {
                            return this.drillDown(cell.result.item);
                        } else {
                            return this.endDrillDown();
                        }
                    default:
                        return null;
                }
            });

        return [table, rows, cells];
    }

    makeSparks (data) {
        const table = this.tableContainer
            .append('table')
            .attr('class', 'sparks');

        const tbody = table.append('tbody');

        const sparksData = data.map(result => ({
            item: result.item,
            results: getItemResults(this.data.results, result.item)
        }));

        const rows = tbody.selectAll('tr')
            .data(sparksData, k => k.item)
            .enter().append('tr');

        const cells = rows.selectAll('td')
            .data(row => this.data.results.slice(1, this.data.meta.lastRound + 1).map((round, i) => ({
                result: row.results[i+1],
                roundMeta: row.results[i+1].roundMeta
            })))
            .enter().append('td')
            .attr('class', cell => getSparkClasses(cell, this.currentRound))
            .style('background-color', cell => getSparkColor(cell, this.currentRound, this.params))
            .on('mouseover', cell => this.preview(cell.roundMeta.index))
            .on('mouseout', cell => this.endPreview(false))
            .on('click', cell => this.endPreview(true));

        const scale = d3.scaleLinear()
            .domain([1, sparksData.length])
            .range([0, 100]);

        cells.filter(cell => cell.result.change !== null)
            .append('span')
            .attr('class', 'spark-position')
            .style('top', cell => `${scale(cell.result.position.strict)}%`);

        cells.filter(cell => cell.result.change !== null)
            .append('span')
            .attr('class', 'spark-score muted')
            .style('color', cell => this.params.colors[cell.result.outcome] || 'black')
            .text(cell => cell.result.match ? `${cell.result.match.score}:${cell.result.match.opponentScore}` : '');

        cells.filter(cell => cell.roundMeta.index > this.currentRound)
            .classed('overlapped', true);


        this.dispatch.on('roundPreview.sparks', roundMeta => this.moveSparks(roundMeta.index, 0));

        return [table, rows, cells];
    }

    makeSlider (position = 'top') {
        const slider = position === 'top'
            ? this.sparks.table.select('tbody').insert('tr', 'tr')
            : this.sparks.table.select('tbody').append('tr');

        slider
            .attr('class', `sparklines-slider ${position}`)
            .append('td')
            .attr('class', 'slider-cell')
            .attr('colspan', this.roundsTotalNumber);

        const left = `${this.scale(this.currentRound)}px`;
        return slider.select('.slider-cell')
            .append('span')
            .attr('class', 'slider-toggle')
            .style('left', left)
            .text(this.data.results[this.currentRound].meta.name)
            .call(d3.drag()
                .on("drag", () => {
                    const roundIndex = Math.round(this.scale.invert(d3.event.x));
                    this.moveRightTable(roundIndex);
                    this.preview(roundIndex);
                })
                .on("end", () => this.endPreview(true))
            );
    }

    to (roundIndex) {
        if (roundIndex < 1 || roundIndex > this.data.meta.lastRound) {
            return Promise.reject(`Sorry we can't go to round #${roundIndex}`);
        }

        if (roundIndex === this.currentRound) {
            return Promise.resolve();
        }

        const change = roundIndex - this.currentRound;
        this.dispatch.call('roundChange', this, this.data.results[roundIndex].meta);

        ['left', 'right'].forEach(side => {
            this[side].rows
                .data(this.data.results[roundIndex].results, k => k.item);

            this[side].cells = this[side].cells
                .data(result => this[side].columns.map(column => new Cell(column, result, this.params)));
        });

        this.right.cells.filter('.change')
            .attr('class', cell => cell.classes.join(' '))
            .style('color', cell => cell.color)
            .text(cell => cell.text);

        const preAnimations = ['right', 'slider', 'sparks']
            .filter(element => this[element].roundIndex !== this.currentRound);

        preAnimations.forEach(element => {
            return {
                right: this.moveRightTable,
                slider: this.moveSlider,
                sparks: this.moveSparks
            }[element].bind(this)(roundIndex, this.durations.pre)
        });

        const duration = this.durations.scale(Math.abs(change));
        return this.move(roundIndex, preAnimations.length ? this.durations.pre : 0, duration)
            .then(() => {
                const merged = d3.merge([this.left.cells.nodes(), this.right.cells.filter(':not(.change)').nodes()]);
                d3.selectAll(merged)
                    .attr('class', cell => cell.classes.join(' '))
                    .style('color', cell => cell.color)
                    .text(cell => cell.text);
            });
    }

    moveSlider (roundIndex, duration = 0) {
        const left =`${this.scale(roundIndex)}px`;
        [this.slider.top, this.slider.bottom].map(slider => {
            slider
                .transition()
                .duration(duration)
                .style('left', left)
                .text(this.data.results[roundIndex].meta.name)
                .on('end', () => this.slider.roundIndex = roundIndex);
        });
    }

    moveRightTable (roundIndex, duration = 0) {
        this.right.table
            .transition()
            .duration(duration)
            .style('left', `-${this.sparks.width - this.scale(roundIndex)}px`)
            .on('end', () => this.right.roundIndex = roundIndex);
    }

    moveSparks (roundIndex, duration = 0) {
        const changed = this.sparks.cells
            .filter(cell => isBetween(cell.roundMeta.index, roundIndex, this.sparks.roundIndex));

        if (!duration) {
            changed
                .style('background-color', cell => getSparkColor(cell, roundIndex, this.params))
                .style('opacity', cell => cell.roundMeta.index > roundIndex ? 0.15 : 1);

            this.sparks.roundIndex = roundIndex
        } else {
            changed
                .transition()
                .duration(duration)
                .style('background-color', cell => getSparkColor(cell, roundIndex, this.params))
                .style('opacity', cell => cell.roundMeta.index > roundIndex ? 0.15 : 1)
                .on('end', () => this.sparks.roundIndex = roundIndex);
        }
    }

    first () {
        return this.to(1);
    }

    preview (roundIndex) {
        if (roundIndex < 1 || roundIndex > this.data.meta.lastRound) {
            return Promise.reject(`Sorry we can't preview round #${roundIndex}`);
        }

        const previousPreviewedRound = this.previewedRound;

        if (previousPreviewedRound === roundIndex) {
            return Promise.resolve();
        }

        this.dispatch.call('roundPreview', this, this.data.results[roundIndex].meta);

        this.moveSlider(roundIndex);

        ['left', 'right'].forEach(side => {
            this[side].rows
                .data(this.data.results[roundIndex].results, k => k.item);

            this[side].cells = this[side].cells
                .data(result => this[side].columns.map(column => new Cell(column, result, this.params)))
                .attr('class', cell => cell.classes.join(' '))
                .style('color', cell => cell.color)
                .text(cell => cell.text);
        });

        return Promise.resolve();
    }

    drillDown (item) {
        this.dispatch.call('drillDown', this, item);

        if (!this.drilldown.controls) {
            this.drilldown.controls = this.controls.append('div')
                .attr('class', 'drilldown-control')
                .on('click', this.endDrillDown)
                .text(this.params.allLabel);
        }

        this.right.columns = columns.drilldown;

        this.right.cells
            .data(result => this.right.columns.map(column => new Cell(column, result, this.params)))
            .attr('class', cell => cell.classes.join(' '))
            .style('color', cell => cell.color)
            .text(cell => cell.text);

        this.right.rows.classed('muted', row => row.item !== item);

        this.sparks.cells
            .classed('muted', cell => !cell.result.match || (cell.result.item !== item && cell.result.match.opponent !== item));

        this.sparks.cells.selectAll('.spark-score')
            .classed('muted', cell => !cell.result.match || cell.result.item === item || cell.result.match.opponent !== item);

        return Promise.resolve();
    }

    endDrillDown () {
        this.drilldown.controls.remove();
        this.drilldown.controls = null;

        this.sparks.cells.classed('muted', false);

        this.sparks.cells.selectAll('.spark-score')
            .classed('muted', true);

        this.right.columns = columns.right;

        this.right.cells
            .data(result => this.right.columns.map(column => new Cell(column, result, this.params)))
            .attr('class', cell => cell.classes.join(' '))
            .style('color', cell => cell.color)
            .text(cell => cell.text);

        this.right.rows.classed('muted', false);

        this.dispatch.call('endDrillDown', this, null);

        return Promise.resolve();
    }
};


class Cell extends skeletonCell {
    score (result, params) {
        this.text = result.match && result.match.score !== null ? `${result.match.score}:${result.match.opponentScore}` : '';
        this.classes = ['score', 'change'];
        this.color = params.colors[result.outcome];
        return this;
    }

    opponent (result, params) {
        this.text = result.match ? result.match.opponent : '';
        this.classes = ['opponent', 'change'];
        return this;
    }

    equal (result, params) {
        this.text = result.position.strict === 1 ? '=' : '';
        this.classes = ['label'];
        return this;
    }

    pointsLabel (result, params) {
        this.text = result.position.strict === 1 ? params.pointsLabel : '';
        this.classes = ['label'];
        return this;
    }

    wins (result, params) {
        this.text = `${result.wins.total} w.`;
        this.classes = ['change'];
        this.color = params.colors.win;
        return this;
    }

    draws (result, params) {
        this.text = `${result.draws.total} d.`;
        this.classes = ['calculation'];
        this.color = params.colors.draw;
        return this;
    }

    losses (result, params) {
        this.text = `${result.losses.total} l.`;
        this.classes = ['calculation'];
        this.color = params.colors.loss;
        return this;
    }

    labeledPoints (result, params) {
        this.text = `${result.points.total} points`;
        this.classes = ['calculation'];
        return this;
    }

    makeChange (column, result, params) {
        const calc = column.replace('.change', '');
        this.text = result.change !== null ? numberToChange(result[calc].change, '0') : '';
        this.classes = ['change'];
        this.color = params.colors[result.outcome];
        return this;
    }
}
