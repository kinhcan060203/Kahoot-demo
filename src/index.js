import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import reduxStore from './redux.js'
const store = reduxStore()

ReactDOM.render(
  // <Provider store={store}>
  <React.StrictMode>
    <h1>sasas</h1>
  </React.StrictMode>
  // </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

