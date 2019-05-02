import React, { Component } from 'react';
import fire from '../config/Fire';
import Defaults from '../AppDefaults'
import './Login.css'

import { Button, HintButton } from '../controls/Button';
import { TextField } from '../controls/TextField';
import { Heading } from '../controls/Heading';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    document.title = "TimeAid – Login"
  }

  handleEmailTextFieldChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordTextFieldChange(e) {
    this.setState({ password: e.target.value })
  }

  // Calls Firebases signInWithEmailAndPassword()
  // Uses email and password passed by user
  // Changes auth state on app.js and redirects to home.js
  handleLogin(e) {
    e.preventDefault();
    this.commitLogin();
  }

  commitLogin() {
    var emailTFLength = document.getElementById('emailTextField').value.length;
    var passwordTFLength = document.getElementById('passwordTextField').value.length;

    if (emailTFLength === 0 && passwordTFLength === 0) {
      alert('Please enter your email and password.');
    } else if (emailTFLength === 0) {
      alert('Please enter your email.');
    } else if (passwordTFLength === 0) {
      alert('Please enter your password.');
    } else {
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        console.log("Signing in with user: ", user);
      }).catch((error) => {
        document.getElementById('passwordTextField').value = "";
        document.getElementById('loginButton').disabled = true;
        document.getElementById('signUpButton').disabled = true;
        console.log(error.code);

        switch (error.code) {
          case 'auth/invalid-email':
            alert("Hmm, that email doesn't look right. Check that you've entered it correctly and try again.");
            break;
          case 'auth/user-not-found':
            alert("Hmm, that's not right. Perhaps you've entered your email or password incorrectly?");
            break;
          case 'auth/user-disabled':
            alert("Seems like this login has been disabled. Please contact support for more informaiton.");
            break;
          case 'auth/too-many-requests':
            alert("Woah, slow down! Try again after some time.");
            break;
          default:
            alert(error);
        }
      });
    }
  }

  // Creates the user with specified email and password
  // Changes auth state on app.js and redirects to home.js
  handleSignUp(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      // Do something here...
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  forgotPassword(e) {
    alert('This button does nothing now');
  }

  render() {
    const isEnabled = this.state.email.length >= 3 && this.state.password.length >= 6;

    const focusPasswordField = e => {
      if (e.key === 'Enter') {
        document.getElementById('passwordTextField').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleLogin(e);
      }
    }

    return (
      <div className="wrapper">
        <div className="form-container">
          <div className="title-group">
            <Heading>{Defaults.app.name}</Heading>
            <p className="caption">Your time for good causes</p>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="form-group">email</label>
              <TextField id="emailTextField" name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordField.bind(this)} noValidate/>
            </div>
            <div className="form-group">
              <label htmlFor="form-group">password</label>
              <TextField id="passwordTextField" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
          </form>
          <div>
            <div className="button-group">
              <Button id="signUpButton" type="button" className="sign-up-button" disabled={!isEnabled} onClick={this.handleSignUp}>Sign up</Button>
              <Button id="loginButton" primary type="submit" disabled={!isEnabled} onClick={this.handleLogin}>Login</Button>
            </div>
            <HintButton type="button" onClick={this.forgotPassword}>Forgot your password?</HintButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;