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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const isFormValid = () => {
    let error;

    if (isFormEmpty()) {
      error = { message: 'Fill in all fields' };
      setErrors([error, ...errors]);
    } else if (!isPasswordValid()) {
      error = { message: 'Password is invalid.' }
      setErrors([error, ...errors]);
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return !username.length || !email.length ||
      !password.length || !passwordConfirmation.length;
  };

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else {
      return password === passwordConfirmation;
    }
  };

  const displayErrors = () => errors.map((error, i) => {
    return <p key={i}>{ error.message }</p>;
  });

  const handleSubmit = event => {
    event.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          console.log(createdUser);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
          setErrors([error, ...errors])
        })
    }
  };

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
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange"/>
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              type="text"
              value={username}
              className={handleInputError("username")}
            />

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

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password Conformation"
              onChange={handleChange}
              type="password"
              value={passwordConfirmation}
              className={handleInputError("password")}
            />

            <Button
              disabled={loading}
              className={ loading ? 'loading' : '' }
              color="orange"
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
        <Message>Already a user? <Link to="/login">Login</Link></Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;