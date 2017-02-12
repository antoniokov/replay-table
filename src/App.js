import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse';
import { getConfig, updateConfigFromData} from './config/config';
import { transform } from './transformers/transform';
import TableContainer from './app/TableContainer';


class App extends Component {
  constructor(props) {
      super(props);

      if (!props.userConfig.csv) {
          this.state = {
              status: 'error',
              errorMessage: 'Please specify csv file using data-csv attribute'
          };
          return;
      }

      this.state = {
          status: 'loading',
          config: getConfig(props.userConfig)
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

      Promise.resolve(this.parseCSV(this.props.userConfig.csv))
          .then(result => {
              if (result.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: result.errorMessage
                  });
                  return;
              }

              const transformedResult = transform(this.state['inputType'], result.data, this.state.config);

              if (transformedResult.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: 'Transformation failed\n' + (result.errorMessage || '')
                  });
                  return;
              }

              this.setState({
                  status: 'success',
                  config: updateConfigFromData(this.state.config, transformedResult),
                  resultsTable: transformedResult.resultsTable
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
              return <TableContainer {...(this.state.config)} />;
      }
  }
}

export default App;
