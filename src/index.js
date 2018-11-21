import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Route} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import rootReducer from './rootReducer';
import * as serviceWorker from './serviceWorker';
import { userLoggedIn } from './actions/auth';
import decode from "jwt-decode";

// import 'semantic-ui-css/semantic.min.css';
//import './index.css';

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.wazooJWT){
  const payload = decode(localStorage.wazooJWT);
  const user = {
    token: localStorage.wazooJWT,
    email: payload.email
};
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <Router>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </Router>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
