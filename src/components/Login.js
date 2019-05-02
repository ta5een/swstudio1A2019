import React, { Component } from 'react';
import fire from '../config/Fire';
import './Login.css'

import { Button, HintButton } from '../controls/Button';
import { TextField } from '../controls/TextField';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.login = this.login.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
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
  login(e) {
    e.preventDefault();
    this.manageLogin();
  }

  manageLogin() {
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
        alert(error);
      });
    }
  }

  // Creates the user with specified email and password
  // Changes auth state on app.js and redirects to home.js
  signup(e) {
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

    return (
      <div className="wrapper">
        <div className="form-container">
          <h1>Time Aid</h1>
          <form onSubmit={() => alert('Form submitted')} noValidate>
            <div className="form-group">
              <label htmlFor="form-group">email</label>
              <TextField id="emailTextField" className="emailTextField" name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailTextFieldChange.bind(this)} noValidate/>
            </div>
            <div className="form-group">
              <label htmlFor="form-group">password</label>
              <TextField id="passwordTextField" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordTextFieldChange.bind(this)} noValidate/>
            </div>
          </form>
          <div>
            <div className="button-group">
              <Button className="signUpButton" disabled={!isEnabled} onClick={this.signup}>Sign up</Button>
              <Button primary type="submit" disabled={!isEnabled} onClick={this.login}>Login</Button>
            </div>
            <HintButton onClick={this.forgotPassword}>Forgot your password?</HintButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;