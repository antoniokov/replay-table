import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import { config, presets } from './config';
import toCamelCase from './auxiliary/toCamelCase'
import { transform } from './transformers/transform';
import TableContainer from './app/TableContainer';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { status: 'loading' };

      if (!props.csv) {
          this.setState({
              status: 'error',
              errorMessage: 'Please specify csv file using data-csv attribute'
          });
          return;
      }

      Object.assign(this.state, this.getConfig(props));
  }

  getConfig (props) {
      const configObject = {};
      Object.keys(config).forEach(key => configObject[key] = config[key].default);

      if (props.preset) {
          if (presets.hasOwnProperty(props.preset)) {
              Object.assign(configObject, presets[props.preset])
          } else {
              console.log(`No ${props.preset} preset for now, sorry about that. Moving on with the default settings.`)
          }
      }

      Object.keys(props)
          .filter(key => !['csv', 'preset', 'style', 'config'].includes(key))
          .map(key => toCamelCase(key))
          .forEach(key => {
              if (!config.hasOwnProperty(key)) {
                  return console.log(`Sorry, there is no ${key} parameter available. Ignoring it and moving on.`);
              }

              const value = config[key].hasOwnProperty('parse') ? config[key].parse(props[key]) : props[key];
              if (config[key].validate(value)) {
                  configObject[key] = value;
              } else {
                  console.log(`Sorry, we cannot accept ${props[key]} as ${key}. Moving on with the default value which is ${configObject[key]}`);
              }
          });

      return configObject;
  }

  parseCSV (path) {
      return fetch(path)
          .then(response => response.text())
          .then(csv => parse(csv))
          .then(json => {
              if(json.errors.length !== 0) {
                  return {
                      status: 'error',
                      errorMessage: 'Parsing csv file failed\n' +  json.errors.map(error => error.message).join('\n')
                  };
              }

              return {
                  status: 'success',
                  data: json.data
              };
          })
          .catch(error => {
              return {
                  status: 'error',
                  errorMessage: 'Fetching csv file failed\n' + error
              };
          });
  }

  componentDidMount() {
      if (this.state.status === 'error') {
          return;
      }

      Promise.resolve(this.parseCSV(this.props.csv))
          .then(result => {
              if (result.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: result.errorMessage
                  });
                  return;
              }

              const params = Object.keys(config)
                  .filter(key => config[key].goesToTransform)
                  .reduce((obj, key) => Object.assign(obj, { [key]: this.state[key] }), {});

              const transformedResult = transform(this.state['inputType'], result.data, params );
              if (transformedResult.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: 'Transformation failed\n' + result.errorMessage
                  });
                  return;
              }

              ['itemName', 'roundsNames', 'extraColumnsNames', 'extraColumns']
                  .filter(param => !this.state[param] && transformedResult[param])
                  .forEach(param => this.setState({ [param]: transformedResult[param]}));

              const lastRound = transformedResult['results'].reduce((maxRoundNumber, round, i) => {
                  return [...round.values()].some(result => result.change !== null) && i > maxRoundNumber ? i : maxRoundNumber;
              }, 0);
              this.setState({ lastRound: lastRound });

              if (!this.state['startFromRound']) {
                  this.setState({ startFromRound: lastRound})
              }

              this.setState({
                  status: 'success',
                  results: transformedResult.results
              });
          })
          .catch(error => {
              this.setState({
                  status: 'error',
                  errorMessage: error
              });
          });
  }

  render() {
      switch (this.state.status) {
          case 'loading':
              return <p>Loading...</p>;
          case 'error':
              return <p>An error occured. {this.state.errorMessage}</p>;
          default:
              return <TableContainer {...(this.state)} />;
      }
  }
}

export default App;
