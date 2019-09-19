import React, { useState, useEffect } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../firebase';

const Channels = ({ currentUser }) => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");
  const [channelsRef] = useState(firebase.database().ref('channels'));

  useEffect(() => {
    addListeners();
  }, [channels.length]);

  const addListeners = () => {
    let loadedChannels = [];
    channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
    });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (isFormValid()) {
      addChannels();
    }
  };

  const addChannels = () => {
    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setChannelName("");
        setChannelDetails("");
        toggleModal();
        console.log("channel added");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const displayChannels = channels => (
    channels.length > 0 && channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
      >
        # {channel.name}
      </Menu.Item>
    ))
  );

  const isFormValid = () => {
    return channelName && channelDetails;
  };

  const handleChange = event => {
    const value = event.target.value;

    switch (event.target.name) {
      case 'channelName':
        setChannelName(value);
        return;
      case 'channelDetails':
        setChannelDetails(value);
        return;
      default:
        return;
    }
  };

  return (
    <div>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>{" "}
            <Icon name='exchange' /> CHANNELS
          </span>
          ({ channels.length  }) <Icon name='add' onClick={toggleModal} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>

      {/*Add channel modal*/}
      <Modal basic open={modal} onClose={toggleModal}>
        <Modal.Header>Add a channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of channel"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>

          <Form>
            <Form.Field>
              <Input
                fluid
                label="Details of channel"
                name="channelDetails"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={toggleModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Channels;