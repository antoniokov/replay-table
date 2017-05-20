import Skeleton from '../skeleton';
import Cell from '../cell';
import fromCamelCase from '../../helpers/general/from-camel-case';
import getItemResults from '../../helpers/data/get-item-results';


const headerlessColumns = ['outcome', 'match', 'round', 'score', 'opponent'];

export default class extends Skeleton {
    renderTable (data, classes = ['main'], columns = this.params.columns, labels = this.params.labels) {
        const table = this.tableContainer
            .append('table')
            .attr('class', classes.join(' '));

        const thead = table.append('thead');
        thead.append('tr')
            .selectAll('th')
            .data(columns)
            .enter().append('th')
            .text((column, i) => {
                if (labels[i]) {
                    return labels[i];
                } else if (headerlessColumns.includes(column) || column.includes('.change')) {
                    return '';
                } else {
                    return fromCamelCase(column);
                }
            });

        const tbody = table.append('tbody');
        const rows = tbody.selectAll('tr')
            .data(data, k => k.item || k.roundMeta.index)
            .enter().append('tr');

        const cells = rows.selectAll('td')
            .data(result => columns.map(column => new Cell(column, result, this.params)))
            .enter().append('td')
            .attr('class', cell => cell.classes.join(' '))
            .style('background-color', cell => cell.backgroundColor || 'transparent')
            .text(cell => cell.text)
            .on('click', cell => {
                switch(cell.column) {
                    case 'item':
                        return this.drillDown(cell.result.item);
                    case 'round':
                        return this.endDrillDown(cell.result.roundMeta.index);
                    default:
                        return null;
                }
            });

        return [table, rows, cells];
    }

    to (roundIndex) {
        if (roundIndex < 0 || roundIndex > this.data.meta.lastRound) {
            return Promise.reject(`Sorry we can't go to round #${roundIndex}`);
        }

        this.dispatch.call('roundChange', this, this.data.results[roundIndex].meta);

        this.rows = this.rows
            .data(this.data.results[roundIndex].results, k => k.item);

        this.cells = this.cells
            .data(result => this.params.columns.map(column => new Cell(column, result, this.params)));

        const animateOutcomes = this.params.columns.includes('outcome');
        if (animateOutcomes) {
            this.table.selectAll('td.outcome')
                .transition()
                .duration(this.durations.outcomes)
                .style("background-color", cell => this.params.colors[cell.result.outcome] || 'transparent');
        }

        this.cells.filter('.change')
            .attr('class', cell => cell.classes.join(' '))
            .text(cell => cell.text);

        return this.move(roundIndex, animateOutcomes ? this.durations.outcomes : 0, this.durations.move)
            .then(() => {
                this.cells.filter(':not(.change)')
                    .attr('class', cell => cell.classes.join(' '))
                    .text(cell => cell.text);
            });
    }

    preview (roundIndex) {
        this.dispatch.call('roundPreview', this, this.data.results[roundIndex].meta);

        this.rows = this.rows
            .data(this.data.results[roundIndex].results, k => k.item);

        this.cells = this.rows.selectAll('td')
            .data(result => this.params.columns.map(column => new Cell(column, result, this.params)))
            .attr('class', cell => cell.classes.join(' '))
            .style('background-color', cell => cell.backgroundColor || 'transparent')
            .text(cell => cell.text);

        return Promise.resolve();
    }

    drillDown (item) {
        this.dispatch.call('drillDown', this, item);

        this.controls.classed('hidden', true);
        this.drilldown.controls = this.controlsContainer.append('div')
            .attr('class', 'drilldown-contorls');
        this.drilldown.controls.append('div')
            .attr('class', 'back')
            .text('<-')
            .on('click', this.endDrillDown.bind(this));
        this.drilldown.controls.append('div')
            .attr('class', 'item')
            .text(item);

        const columns = ['round'];
        const labels = [''];
        this.params.columns.forEach((column, i) => {
            const classes = new Cell(column, this.data.results[1].results[0], this.params).classes;
            if (column !== 'item' && !classes.includes('extra-item')) {
                columns.push(column);
                labels.push(this.params.labels[i] || '');
            }
        });

        const itemData = getItemResults(this.data.results, item, true);

        this.table.classed('hidden', true);
        [this.drilldown.table, this.drilldown.rows, this.drilldown.cells] = this.renderTable(itemData, ['drilldown'], columns, labels);

        return Promise.resolve();
    }

    endDrillDown (roundIndex = null) {
        const end = () => {
            this.dispatch.call('endDrillDown', this, roundIndex);
            return Promise.resolve();
        };

        this.drilldown.controls.remove();
        this.controls.classed('hidden', false);

        this.drilldown.table.remove();
        this.table.classed('hidden', false);

        if (roundIndex !== null) {
            return Promise.resolve(this.to(roundIndex))
                .then(end);
        } else {
            end();
        }
    }
};
