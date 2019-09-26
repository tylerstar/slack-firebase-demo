import React from 'react';
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";

const ColorPanel = () => {
  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider/>
      <Button icon="add" />
    </Sidebar>
  );
};

export default ColorPanel;