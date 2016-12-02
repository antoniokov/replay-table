import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import { config, isParameterValid } from './config';
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
      const configObject = Object.assign({}, config['default']);

      if (props.preset) {
          if (config.hasOwnProperty(props.preset)) {
              Object.assign(configObject, config[props.preset])
          } else {
              console.log(`No ${props.preset} preset for now, sorry about that. Moving on with the default settings.`)
          }
      }

      Object.keys(props)
          .filter(key => !['csv', 'preset', 'style', 'config'].includes(key))
          .map(key => toCamelCase(key))
          .forEach(key => {
              if (isParameterValid(key, props[key])) {
                  configObject[key] = props[key];
              } else if (configObject.hasOwnProperty(key)) {
                  console.log(`Sorry, we cannot accept ${props[key]} as ${key}. Moving on with the default value which is ${configObject[key]}`);
              } else {
                  console.log(`Sorry, there is no ${key} parameter available. Ignoring it and moving on.`);
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

              const params = {
                  startRoundName: this.state['startRoundName'],
                  tiesResolution: this.state['tiesResolution']
              };
              const transformedResult = transform('changesTable', result.data, params );
              if (transformedResult.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: 'Transformation failed\n' + result.errorMessage
                  });
                  return;
              }

              if (!this.state['itemName']) {
                  this.setState({ itemName: transformedResult['itemName']})
              }

              if (!this.state['roundsNames']) {
                  this.setState({ roundsNames: transformedResult['roundsNames']})
              }

              const lastRound = transformedResult['results'].reduce((maxRoundNumber, round, i) => {
                  return round.some(result => result.change !== null) && i > maxRoundNumber ? i : maxRoundNumber;
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
              return (
                  <TableContainer
                      positionName={this.state['positionName']}
                      itemName={this.state['itemName']}
                      totalName={this.state['totalName']}
                      showChangeDuringAnimation={this.state['showChangeDuringAnimation']}
                      showProgressBar={this.state['showProgressBar']}
                      roundsNames={this.state['roundsNames']}
                      results={this.state['results']}
                      resultName={this.state['resultName']}
                      startFromRound={this.state['startFromRound']}
                      lastRound={this.state['lastRound']}
                      animationDuration={this.state['animationDuration']}
                  />
              );
      }
  }
}

export default App;
