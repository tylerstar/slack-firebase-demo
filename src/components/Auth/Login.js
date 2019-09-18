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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    const value = event.target.value;

    switch (event.target.name) {
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      default:
        return;
    }
  };

  const displayErrors = () => errors.map((error, i) => {
    return <p key={i}>{ error.message }</p>;
  });

  const handleSubmit = event => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(signedInUser => {
          console.log(signedInUser);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setErrors([error, ...errors]);
          setLoading(false);
        });
    }
  };

  const isFormValid = () => email && password;

  const handleInputError = inputName => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : ""
  };

  return (
    <Grid textAlign="center" vericalAlign="middle" className="app">
      <Grid.Column style={{maxWidth: 450}}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="puzzle piece" color="violet"/>
          Login for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              type="text"
              value={email}
              className={handleInputError("email")}
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
              value={password}
              className={handleInputError("password")}
            />

            <Button
              disabled={loading}
              className={ loading ? 'loading' : '' }
              color="violet"
              fluid size="large"
            >
              Submit
            </Button>

          </Segment>
        </Form>
        { errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            { displayErrors() }
          </Message>
        )}
        <Message>Don't have an account? <Link to="/register">Register</Link></Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;