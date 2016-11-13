import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import TableContainer from './App/TableContainer';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          status: 'loading'
      };
  }

  transpose(matrix) {
      return Object.keys(matrix[0])
          .map(colNumber => matrix.map(rowNumber => rowNumber[colNumber]));
  }

  deltaToData(delta) {
      const [itemName, ...roundsNames] = delta[0];
      const [items, ...deltas] = this.transpose(delta.slice(1));
      const results = deltas.map(resultRow => resultRow.map((result, i) => {
          return {
              item: items[i],
              change: parseInt(result, 10)
          };
      }));
      return [itemName, roundsNames, results];
  }

  componentDidMount() {
      return fetch('/results.csv')
          .then(response => response.text())
          .then(csv => parse(csv))
          .then(json => {
              if(json.errors.length !== 0) {
                  this.setState({
                      status: 'error',
                      errorMessage: json.errors[0].message
                  });
              }

              const [itemName, roundsNames, results] = this.deltaToData(json.data);
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
                  />
              );
      }
  }
}

export default App;
