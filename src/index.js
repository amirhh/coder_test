import './polyfill'
import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

let reduxDevtools = undefined;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') { //if is development then enable redux_devtools
  reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer, /* preloadedState, */
  reduxDevtools
);
/* eslint-enable */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// disable ServiceWorker
// registerServiceWorker();
