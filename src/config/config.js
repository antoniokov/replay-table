import parameters from './parameters';
import presets from './presets';
import inputs from './inputs';
import toCamelCase from '../auxiliary/toCamelCase';


//Think of proper chaining
const config = {
    obj: {},
    setDefaults: function () {
        this.obj = Object.keys(parameters)
            .reduce((obj, param) => Object.assign(obj, { [param]: parameters[param].default }), {});
        return this;
    },
    setPreset: function () {
        const preset = this.userConfig.preset;

        if (!preset) {
            return this;
        }

        if (!presets.hasOwnProperty(preset)) {
            console.log(`No "${preset}" preset for now, sorry about that. Moving on with the default settings.`);
            return this;
        }

        this.obj = Object.assign(this.obj, presets[preset]);
        return this;
    },
    setParameters: function () {
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
    },
    setModes: function () {
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
        this.obj.roundMode = inputs[this.obj.inputType].roundMode;

        return this;
    },
    setTerms: function () {
        const terms = Object.keys(this.obj).filter(param => param.endsWith('Name'));
        this.obj.terms = terms.reduce((obj, term) => Object.assign(obj, { [term]: this.obj[term] }), {});
        terms.forEach(term => delete this.obj[term]);

        return this;
    },
    updateFromData: function () {
        if (!this.obj.terms.itemName) {
            this.obj.terms.itemName = this.data.itemName;
        }

        ['roundsNames', 'extraColumnsNames', 'extraColumns']
            .forEach(param => this.obj[param] = this.obj[param] || this.data[param]);

        this.obj.lastRound = this.data.resultsTable
            .filter(round => [...round.results.values()].some(result => result.change !== null))
            .reduce((maxIndex, round) => Math.max(round.meta.index, maxIndex), 0);

        this.obj.startFromRound = this.obj.startFromRound || this.obj.lastRound;

        return this;
    }
};

export function getConfig (userConfig) {
    config.userConfig = userConfig;
    return config
        .setDefaults()
        .setPreset()
        .setParameters()
        .setModes()
        .setTerms()
        .obj;
}

export function updateConfigFromData (config, data) {
    config.data = data;
    return config.updateFromData().obj;
}