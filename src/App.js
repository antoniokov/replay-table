import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import parseDeltaTable from './Transformers/DeltaTable';
import TableContainer from './App/TableContainer';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          status: 'loading'
      };
  }

  componentDidMount() {
      return fetch('/results.csv')
          .then(response => response.text())
          .then(csv => parse(csv))
          .then(json => {
              if(json.errors.length !== 0) {
                  const errorMessage = json.errors.map(error => error.message).join('\n');
                  this.setState({
                      status: 'error',
                      errorMessage: errorMessage
                  });
                  return;
              }

              const [itemName, roundsNames, results] = parseDeltaTable(json.data);
              this.setState({
                  status: 'success',
                  itemName: itemName,
                  roundsNames: roundsNames,
                  results: results
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
                      itemName={this.state.itemName}
                      roundsNames={this.state.roundsNames}
                      results={this.state.results}
                      showChange={false}
                  />
              );
      }
  }
}

export default App;
