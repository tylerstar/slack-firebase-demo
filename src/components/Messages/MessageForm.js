import React, { useState } from 'react';
import { Button, Segment, Input } from "semantic-ui-react";
import firebase from '../../firebase';

const MessageForm = ({ messagesRef, currentChannel, currentUser }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [channel] = useState(currentChannel);
  const [user] = useState(currentUser);
  const [errors, setErrors] = useState([]);

  const handleChange = event => {
    const value = event.target.value;

    switch (event.target.name) {
      case 'message':
        setMessage(value);
        return;
      default:
        return;
    }
  };

  const createMessage = () => {
    return {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      },
      content: message
    };
  };

  const sendMessage = event => {
    if (message) {
      setLoading(true);
      messagesRef
        .current
        .child(channel.id)
        .push()
        .set(createMessage())
        .then(() => {
          setLoading(false);
          setMessage('');
        })
        .catch(err => {
          console.log(err);
          setErrors([err, ...errors]);
          setLoading(false);
        })
    } else {
      setErrors([
        { message: 'Add a message' },
        ...errors
      ])
    }
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        value={message}
        name="message"
        onChange={handleChange}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon='add' />}
        labelPosition="left"
        className={
          errors.some(error =>
            error.message.includes('message')) ? 'error' : ''
        }
        placeholder="Write your message"
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          disabled={loading}
          color="orange"
          content="Add reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;