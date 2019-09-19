import React from 'react';
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';
import ColorPanel from '../components/ColorPanel';
import SidePanel from '../components/SidePanel';
import Messages from '../components/Messages';
import MetaPanel from '../components/MetaPanel';
import './App.css';

const App = ({ currentUser }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

    <Grid.Column width="4">
      <MetaPanel />
    </Grid.Column>

  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default connect(
  mapStateToProps
)(App);
