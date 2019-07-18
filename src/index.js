import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Montserrat: 600', 'Open Sans: 500, 500i, 600, 700, 800']
//   }
// });

ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();