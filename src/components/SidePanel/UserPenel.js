import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

const UserPanel = ({ currentUser }) => {
  const dropDownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong> {currentUser && currentUser.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={handleSignout}>Sign Out</span>
    }
  ];

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };

  return (
    <Grid style={{ background: '#4c3c4c' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header*/}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>

          {/*User Dropdown*/}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown trigger={
              <span>
              <Image src={currentUser.photoURL} spaced='right' avatar />
                { currentUser.displayName }
            </span>
            } options={dropDownOptions()} />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;