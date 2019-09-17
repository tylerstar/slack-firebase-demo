import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import firebase from '../../firebase';

const Register = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const handleChange = event => {
    const value = event.target.value;

    switch (event.target.name) {
      case "username":
        setUsername(value);
        return;
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      case "passwordConfirmation":
        setPasswordConfirmation(value);
        return;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(createdUser);
      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <Grid textAlign="center" vericalAlign="middle" className="app">
      <Grid.Column style={{maxWidth: 450}}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange"/>
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              type="text"
              value={username}
            />

            <Form.Input
              fluid name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              type="text"
              value={email}
            />

            <Form.Input
              fluid name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
              value={password}
            />

            <Form.Input
              fluid name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password Conformation"
              onChange={handleChange}
              type="password"
              value={passwordConfirmation}
            />

            <Button color="orange" fluid size="large">Submit</Button>
          </Segment>
        </Form>
        <Message>Already a user? <Link to="/login">Login</Link></Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;