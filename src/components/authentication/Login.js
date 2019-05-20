import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorEmail: false,
      errorPassword: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    document.title = `${AppDefaults.app.name} – Login`;
  }

  // Calls Firebases signInWithEmailAndPassword()
  // Uses email and password passed by user
  // Changes auth state on app.js and redirects to home.js
  handleLogin(e) {
    e.preventDefault();

    document.getElementById('loginButton').blur();
    document.getElementById('signUpButton').blur();

    var emailTextFieldLength = document.getElementById('emailTextField').value.length;
    var passwordTextFieldLength = document.getElementById('passwordTextField').value.length;

    UI.showInfoBox(this, "Logging you in...");

    if (emailTextFieldLength === 0 && passwordTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your email and password.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true, errorPassword: true });
      document.getElementById('emailTextField').focus();
    } else if (emailTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your email.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true });
      document.getElementById('emailTextField').focus();
    } else if (passwordTextFieldLength === 0) {
      UI.showInfoBox(this, "Please enter your password.", UI.DialogType.WARNING);
      this.setState({ errorPassword: true });
      document.getElementById('passwordTextField').focus();
    } else {
      this.commitLogin();
    }
  }

  commitLogin() {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      console.log("Signing in with user: ", user);
      this.props.history.push('/home');
    }).catch((error) => {
      this.displayAuthError(error);
    });
  }

  displayAuthError(error) {
    this.setState({ password: "" });

    document.getElementById('loginButton').disabled = true;

    switch (error.code) {
      case 'auth/invalid-email':
        UI.showInfoBox(this, "Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", UI.DialogType.ERROR);
        this.setState({ errorEmail: true });
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/user-not-found': // Fallthrough
      case 'auth/wrong-password':
        UI.showInfoBox(this, "Something's not right... Perhaps you've entered your email or password incorrectly?", UI.DialogType.ERROR);
        break;
      case 'auth/user-disabled':
        UI.showInfoBox(this, "It appears that this account has been disabled. Please contact support for more information.", UI.DialogType.ERROR);
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/too-many-requests':
        UI.showInfoBox(this, "Woah, slow down! Look's like you've requested too many requests.", UI.DialogType.ERROR);
        break;
      default:
        UI.showInfoBox(this, error.message, UI.DialogType.ERROR);
        return;
    }
  }

  collapseErrorBox() {
    document.getElementById('infoBoxDiv').hidden = true;
    this.setState({ errorEmail: false, errorPassword: false });
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

    const handleEmailTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ email: e.target.value })
    }

    const handlePasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ password: e.target.value })
    }

    return (
      <div className="login-wrapper">
        <div className="login-form-container">
          <div className="login-title-group">
            <UI.Title className="login-title">{AppDefaults.app.name}</UI.Title>
            <UI.Caption>{AppDefaults.app.caption}</UI.Caption>
          </div>
          <form>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorEmail ? "login-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "login-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordField.bind(this)} noValidate/>
            </div>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group" className={this.state.errorPassword ? "login-error-text-field-label" : null}>password</UI.Label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "login-error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={handlePasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
          </form>
          <div id="infoBoxDiv" className="login-info-box-div" hidden={true}/>
          <div className="login-button-group">
            <UI.Button primary id="loginButton" className="login-button" type="submit" disabled={!isEnabled} onClick={this.handleLogin}>Login</UI.Button>
          </div>
          <UI.HintButton id="signUpButton" type="button" onClick={() => this.props.history.push('/sign-up')}>Don't have an account?</UI.HintButton>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);