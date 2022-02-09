import React from 'react';
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import inventoryTableReducer from './Store/Reducer/inventoryTableReducer'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
    inventoryTable: inventoryTableReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(Thunk)));

ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
  document.getElementById('root')
);

reportWebVitals();
