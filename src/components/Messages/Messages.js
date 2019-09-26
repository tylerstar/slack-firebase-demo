import React, { useRef, useEffect, useState } from 'react';
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm'
import Message from './Message';
import firebase from '../../firebase';

const Messages = ({ currentChannel, currentUser }) => {
  const messagesRef = useRef(firebase.database().ref('messages'));
  const [user] = useState(currentUser);
  const [channel] = useState(currentChannel);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    if (channel && user) {
      addListeners(channel.id);
    }
  }, [messages.length]);

  const addListeners = channelId => {
    addMessageListener(channelId);
  };

  const addMessageListener = channelId => {
    let loadedMessages = [];
    messagesRef.current.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      setMessages(loadedMessages);
      setMessagesCount(messages.length);
      setMessagesLoading(false);
    });
  };

  const displayMessages = messages => {
    return (
      messages.length > 0 && messages.map(message => (
        <Message
          key={message.timestamp}
          message={message}
          user={user}
        />
      ))
    );
  };

  return (
    <React.Fragment>
      <MessagesHeader/>

      <Segment>
        <Comment.Group className="messages">
          { displayMessages(messages) }
        </Comment.Group>
      </Segment>

      <MessageForm
        messagesRef={messagesRef}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
};

export default Messages;