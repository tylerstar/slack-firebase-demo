import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as
    Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

const Root = ({ history }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/");
      }
    })
  });

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RootWithAuth/>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
