import React from 'react';
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessagesHeader = () => {
  return (
    <Segment clearing>
      {/*Channel Title*/}
      <Header fluid="true" as="h2" floated="left" style={{ marginButton: 0}}>
        <span>
          Channel
          <Icon name="star outline" color="black" />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>

      {/*Channel Search Input*/}
      <Header floated="right">
        <Input
          size="large"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;