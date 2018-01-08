import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-widgets/dist/css/react-widgets.css';
//import registerServiceWorker from './registerServiceWorker'; // 4 dev

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

//registerServiceWorker(); // 4 dev
