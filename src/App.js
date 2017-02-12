import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse';
import Config from './config/Config';
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
          config: new Config(props.userConfig)
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

              const configObject = this.state.config.toObject();
              const transformedResult = transform(configObject.inputType, result.data, configObject);

              if (transformedResult.status === 'error') {
                  this.setState({
                      status: 'error',
                      errorMessage: 'Transformation failed\n' + (result.errorMessage || '')
                  });
                  return;
              }

              this.setState({
                  status: 'success',
                  config: this.state.config.updateWithData(transformedResult)
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
              return <p>Gosh! An error occured. {this.state.errorMessage}</p>;
          default:
              return <TableContainer {...(this.state.config.toObject())} />;
      }
  }
}

export default App;
