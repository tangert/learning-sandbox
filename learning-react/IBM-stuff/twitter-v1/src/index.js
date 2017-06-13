import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './Components/Containers/App/App';
import Admin from './Components/Containers/Admin/Admin';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';

class AppHeader extends Component {
  render(){
    return(
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <div className = "container">
        <AppHeader/>
        <Switch>
          <Route exact path="/" component = { App } />
          <Route path="/admin" component = { Admin } />
        </Switch>
    </div>
  </Router>,

  document.getElementById('root')
);
