import parameters from './parameters';
import presets from './presets';
import inputs from './inputs';
import toCamelCase from '../auxiliary/toCamelCase';


export default class Config {
    constructor (userConfig) {
        this.userConfig = userConfig;
        console.log(userConfig.tableName);

        this.setDefaults()
            .setPreset()
            .setParameters()
            .setModes()
            .setTerms();
    }

    setDefaults () {
        this.obj = Object.keys(parameters)
            .filter(param => !parameters[param].deprecated)
            .reduce((obj, param) => Object.assign(obj, { [param]: parameters[param].default }), {});
        return this;
    }

    setPreset () {
        if (!this.userConfig.preset) {
            return this;
        }

        if (!presets.hasOwnProperty(this.userConfig.preset)) {
            console.log(`No "${this.userConfig.preset}" preset for now, sorry about that. Moving on with the default settings.`);
            return this;
        }

        this.obj = Object.assign(this.obj, presets[this.userConfig.preset]);
        this.obj.preset = this.userConfig.preset;
        delete this.obj.terms;

        return this;
    }

    setParameters () {
        Object.keys(this.userConfig)
            .filter(param => !['csv', 'preset', 'style', 'parameters', 'modes'].includes(param))
            .map(param => toCamelCase(param))
            .forEach(param => {
                if (!parameters.hasOwnProperty(param)) {
                    console.log(`Sorry, there is no "${param}" parameter available. Ignoring it and moving on.`);
                    return;
                }

                const value = parameters[param].parse(this.userConfig[param]);
                if (!parameters[param].validate(value)) {
                    console.log(`Sorry, we cannot accept ${this.userConfig[param]} as ${param}. Moving on with the default value.`);
                    return;
                }

                this.obj[param] = value;
            });

        return this;
    }

    setModes () {
        this.obj.roundMode = inputs[this.obj.inputType].roundMode;

        if (!this.userConfig.modes) {
            this.obj.modes = inputs[this.obj.inputType].modes;
            return this;
        }

        const modes = parameters.modes.parse(this.userConfig.modes);
        if (!parameters.modes.validate(modes)) {
            console.log(`Sorry, we cannot accept your modes: ${modes}.\
                Moving on with the default modes for ${this.obj.inputType}: ${inputs[this.obj.inputType].modes}.`);
            this.obj.modes = inputs[this.obj.inputType].modes;
            return this;
        }

        this.obj.modes = modes.filter(mode => inputs[this.obj.inputType].modes.includes(mode));

        return this;
    }


    setTerms () {
        //Backward compatibility
        const oldTerms = Object.keys(this.obj)
            .filter(param => param.endsWith('Name') && !['tableName'].includes(param))
            .reduce((obj, term) => Object.assign(obj, { [term.slice(0, -4)]: this.obj[term] }), {});

        console.log(oldTerms);

        this.obj.terms = Object.assign({},
            parameters.terms.default,
            this.obj.preset && presets[this.obj.preset].terms,
            oldTerms,
            this.obj.terms);

        return this;
    }

    updateWithData (data) {
        this.obj.resultsTable = data.resultsTable;

        if (!this.obj.terms.item) {
            this.obj.terms.item = data.itemName;
        }

        ['roundsNames', 'extraColumnsNames', 'extraColumns']
            .filter(param => !this.obj[param])
            .forEach(param => this.obj[param] = data[param]);

        this.obj.lastRound = data.resultsTable
            .filter(round => [...round.results.values()].some(result => result.change !== null))
            .reduce((maxIndex, round) => Math.max(round.meta.index, maxIndex), 0);

        this.obj.startFromRound = this.obj.startFromRound || this.obj.lastRound;

        return this;
    }

    toObject () {
        return this.obj;
    }
}