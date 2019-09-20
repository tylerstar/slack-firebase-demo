import React, { useState, useEffect, useRef } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentChannel } from "../actions";
import firebase from '../firebase';

const Channels = ({ currentUser, setCurrentChannel }) => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");
  const channelsRef = useRef(firebase.database().ref('channels'));
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChannel, setActiveChannel] = useState("");

  useEffect(() => {
    addListeners();
  }, [channels.length]);

  useEffect(() => {
    return () => {
      removeListeners();
      console.log('remove listeners');
    };
  }, []);

  const addListeners = () => {
    let loadedChannels = [];
    channelsRef.current.on('child_added', snap => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
      setFirstChannel();
    });
  };

  const removeListeners = () => {
    channelsRef.current.off();
  };

  const setFirstChannel = () => {
    if (firstLoad && channels.length > 0) {
      const firstChannel = channels[0];
      setCurrentChannel(firstChannel);
      setActiveChannel(firstChannel.id);
      setFirstLoad(false);
    }
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
    const key = channelsRef.current.push().key;

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
      .current
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
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
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

  const changeChannel = (channel) => {
    setActiveChannel(channel.id);
    setCurrentChannel(channel);
  };

  return (
    <div>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name='exchange' /> CHANNELS
          </span>{" "}
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


export default connect(
  null,
  { setCurrentChannel }
)(Channels);