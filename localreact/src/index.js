import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EditableTable from "./EditableTable";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<EditableTable />, document.getElementById('editabletable'));
registerServiceWorker();
