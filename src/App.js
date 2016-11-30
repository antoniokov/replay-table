import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import config from './config';
import transform, { transformers } from './transformers/transform';
import TableContainer from './app/TableContainer';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { status: 'loading' };
      Object.assign(this.state, this.getConfig(props));
  }

  getConfig (props) {
      const configObject = config['default'];
      if(props.preset) {
          if (config.hasOwnProperty(props.preset)) {
              Object.assign(configObject, config[props.preset])
          } else {
              console.log(`No ${props.preset} preset for now, sorry about that. Moving on with the default settings.`)
          }
      }

      if (props.inputType) {
          if(transformers.hasOwnProperty(props.inputType)) {
              configObject.inputType = props.inputType;
          } else {
              console.log(`Cannot handle ${props.inputType} input type for now, sorry. Moving on with ${configObject.inputType}.`)
          }
      }

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
                      errorMessage: json.errors.map(error => error.message).join('\n')
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
                  errorMessage: error
              };
          });
  }

  componentDidMount() {
      Promise.resolve(this.parseCSV(this.props.csv))
          .then(result => {
              if (result.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: result.errorMessage
                  });
                  return;
              }

              const transformedResult = transform('changesTable', result.data, { tiesResolution: this.state['tiesResolution'] });
              if (transformedResult.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: result.errorMessage
                  });
                  return;
              }

              if (!this.state['itemName']) {
                  this.setState({ itemName: transformedResult['itemName']})
              }

              if (!this.state['roundsNames']) {
                  this.setState({ roundsNames: transformedResult['roundsNames']})
              }

              if (!this.state['startFromRound']) {
                  this.setState({ startFromRound: this.state['roundsNames'].length - 1})
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
              return <p>Failed to load the table: {this.state.errorMessage}</p>;
          default:
              return (
                  <TableContainer
                      positionName={this.state['positionName']}
                      itemName={this.state['itemName']}
                      totalName={this.state['totalName']}
                      showChangeColumn={this.state['showChangeColumn']}
                      roundsNames={this.state['roundsNames']}
                      results={this.state['results']}
                      resultName={this.state['resultName']}
                      startFromRound={this.state['startFromRound']}
                      animationDuration={this.state['animationDuration']}
                  />
              );
      }
  }
}

export default App;
