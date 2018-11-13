import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
//import './App.css';                       // Imported css

const App = ({ location }) => (
  <div className="ui ">
    <Route location={location} path="/" component={HomePage} exact/>
    <GuestRoute location={location} path="/login" component={LoginPage} exact/>
    <GuestRoute location={location} path="/signup" component={SignupPage} exact/>
    <UserRoute location={location} path="/dashboard" component={DashboardPage} exact/>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
