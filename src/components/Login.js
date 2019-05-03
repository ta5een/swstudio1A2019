import React, { Component } from 'react';
import fire from '../config/Fire';
import Defaults from '../AppDefaults'
import './Login.css'

import { Button, HintButton } from '../controls/Button';
import { TextField } from '../controls/TextField';
import { H1, Title } from '../controls/Headings';
import { ErrorBox } from '../controls/ErrorBox';

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
    this.collapseErrorBox();
    this.setState({ email: e.target.value })
  }

  handlePasswordTextFieldChange(e) {
    this.collapseErrorBox();
    this.setState({ password: e.target.value })
  }

  collapseErrorBox() {
    var errorBox = document.getElementById('errorBox');
    var childNodes = errorBox.childNodes;

    for (var node = 0; node < childNodes.length; node++) {
      errorBox.removeChild(childNodes[node]);
    }

    errorBox.hidden = true;
  }

  // Calls Firebases signInWithEmailAndPassword()
  // Uses email and password passed by user
  // Changes auth state on app.js and redirects to home.js
  handleLogin(e) {
    e.preventDefault();
    this.commitLogin();
  }

  commitLogin() {
    var emailTextFieldLength = document.getElementById('emailTextField').value.length;
    var passwordTextFieldLength = document.getElementById('passwordTextField').value.length;

    if (emailTextFieldLength === 0 && passwordTextFieldLength === 0) {
      this.showErrorBox("Please enter your email and password.");
    } else if (emailTextFieldLength === 0) {
      this.showErrorBox("Please enter your email.");
    } else if (passwordTextFieldLength === 0) {
      this.showErrorBox("Please enter your password.");
    } else {
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        console.log("Signing in with user: ", user);
      }).catch((error) => {
        this.displayError(error);
      });
    }
  }

  displayError(error) {
    this.setState({ password: "" });

    document.getElementById('loginButton').disabled = true;
    document.getElementById('signUpButton').disabled = true;

    switch (error.code) {
      case 'auth/invalid-email':
        this.showErrorBox("Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", "warning");
        break;
      case 'auth/user-not-found': // Fallthrough
      case 'auth/wrong-password':
        this.showErrorBox("Hmm, that's not right. Perhaps you've entered your email or password incorrectly?", "warning");
        break;
      case 'auth/user-disabled':
        this.showErrorBox("Seems like this login has been disabled. Please contact support for more informaiton.", "warning");
        break;
      case 'auth/too-many-requests':
        this.showErrorBox("Woah, slow down! Try again after some time.", "warning");
        break;
      default:
        this.showErrorBox(error.message);
        return;
    }
  }

  // TODO: Don't append if there's already an existing child node
  showErrorBox(message, attribute=null) {
    var errorBox = document.getElementById('errorBox');
    var textElement = document.createElement('p');
    var errorMessage = document.createTextNode(message);
    textElement.appendChild(errorMessage);

    errorBox.appendChild(textElement);

    // TODO: This isn't working
    if (attribute !== null) {
      errorBox.setAttribute(attribute, "");
    }

    errorBox.hidden = false;
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
            <Title>{Defaults.app.name}</Title>
            <p className="caption">{Defaults.app.caption}</p>
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
          <ErrorBox id="errorBox" className="error-box" hidden={true}/>
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