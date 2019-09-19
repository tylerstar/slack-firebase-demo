import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as
    Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import { createStore } from "redux";
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import { setUser, clearUser } from "./actions";
import Spinner from './Spinner';

const store = createStore(rootReducer, composeWithDevTools());

const Root = ({ history, setUser, isLoading, clearUser }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        history.push("/");
      } else {
        history.push("/login");
        clearUser();
      }
    })
  }, []);

  return isLoading ? <Spinner/> : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser, clearUser }
  )(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
