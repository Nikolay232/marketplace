import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import Trees from './components/Trees';
import Auction from './components/Auction';
import Withdraw from './components/Withdraw';
import Settings from './components/Settings';
import TreeCreate from './components/TreeCreate';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/old_trees" element={<App />} />
      <Route path="/" element={<Trees />} />
      <Route path="/tree_create" element={<TreeCreate />} />
      <Route path="/auction" element={<Auction />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
