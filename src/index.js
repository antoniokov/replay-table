import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const root = document.getElementsByClassName('replayTable')[0];

ReactDOM.render(
    <App {...(root.dataset)} />,
    root
);
