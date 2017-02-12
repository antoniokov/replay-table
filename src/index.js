import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const replayTables = Array.from(document.getElementsByClassName('replayTable'));
replayTables.forEach(table => ReactDOM.render(
    <App userConfig={table.dataset} />,
    table
));