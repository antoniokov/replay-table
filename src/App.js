import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import config from './config';
import transform from './transformers/transform';
import TableContainer from './app/TableContainer';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          status: 'loading',
          config: config['default']
      };
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
                  json: json.data
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
      Promise.resolve(this.parseCSV('/replayTable/results.csv'))
          .then(result => {
              if (result.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: result.errorMessage
                  });
                  return;
              }

              const transformedResult = transform('changesTable', result.json, { ties: this.state.config['tiesResolution'] });
              if (transformedResult.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: result.errorMessage
                  });
                  return;
              }

              this.setState({
                  status: 'success',
                  itemName: transformedResult.itemName || this.state.config.itemName,
                  roundsNames: transformedResult.roundsNames || this.state.config.roundsNames,
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
                      positionName={this.state.config.positionName}
                      itemName={this.state.itemName}
                      totalName={this.state.config.totalName}
                      roundsNames={this.state.roundsNames}
                      results={this.state.results}
                      resultName={this.state.config.resultName}
                      showChange={false}
                      startFrom={this.state.roundsNames.length - 1}
                      animationDuration={this.state.config.animationDuration}
                  />
              );
      }
  }
}

export default App;
