import React from 'react';
import {  BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";
import HomePage from './components/pages/HomePage';
import LoginPage from './components//pages/LoginPage';

import 'semantic-ui-css/semantic.min.css';
import './App.css';                       // Imported css

class App extends React.Component {

  render() {
    return (
      <div className="ui container">
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={LoginPage}/>
      </div>
    );
  }
}

export default App;
