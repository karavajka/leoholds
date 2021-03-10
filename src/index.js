import React from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";

import '../src/ui/index.scss';
import App from './App';
import { createStores } from "./stores/bootstrap";
// import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

const stores = createStores({ history });
window.STORES = stores;

const app = (
  <Provider {...stores}>
    <BrowserRouter history={history}>
      <App stores={stores} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
