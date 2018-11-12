import React from 'react';
import {  BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";
import Map from './components/Map';
import Login from './components/Login';
import NavBar from './components/NavBar';

import './App.css'; // Imported css

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <h1>Home</h1>
          <Route path="/public" component={Public} />
          <Route path="/login" component={Log} />
          <PrivateRoute path="/map" component={Map} />
        </div>
      </Router>
    );
  }
}

function Public() {
  return <h3>Public</h3>;
}

function Log(){
  return (
    <Login fakeAuth={this.fakeAuth}/>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        this.fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
