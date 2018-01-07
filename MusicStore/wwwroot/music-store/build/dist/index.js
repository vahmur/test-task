import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-widgets/dist/css/react-widgets.css';
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
registerServiceWorker(); // TODO: for dev
//# sourceMappingURL=index.js.map