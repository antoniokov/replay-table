import React, { Component } from 'react';
import 'whatwg-fetch';
import { parse } from 'babyparse'
import TableContainer from './App/TableContainer';

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
      var [itemName, ...roundsNames] = delta[0];
      if(roundsNames.every(roundName => !isNaN(parseInt(roundName, 10)))) {
          roundsNames = roundsNames.map(roundName => parseInt(roundName, 10));
      }
      const [items, ...deltas] = this.transpose(delta.slice(1));
      const currentStandings = items.map(item => 0);
      const results = deltas.map(resultRow => resultRow.map((delta, itemNumber) => {
          const change = parseInt(delta, 10);
          currentStandings[itemNumber] += change;
          return {
              item: items[itemNumber],
              change: change,
              total: currentStandings[itemNumber]
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
                  return;
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
              console.log(error);
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
