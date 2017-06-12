import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/Containers/App/App';

//Routing
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div className = "container">
      <Route path="/" component = { App } />
      // this is where you'll place the route for the Admin page!
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
