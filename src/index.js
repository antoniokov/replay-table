import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const replayTables = Array.from(document.getElementsByClassName('replayTable'));
replayTables.forEach(table => ReactDOM.render(
    <App {...(table.dataset)} />,
    table
));