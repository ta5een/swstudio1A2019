import React, { Component } from 'react';

import fire from '../config/Fire';
import AppDefaults from '../AppDefaults';
import * as UI from '../controls/UI';
import './styles/SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    document.title = `${AppDefaults.app.name} – Sign Up`;
  }

  render() {
    return (
      <div className="sign-up-wrapper">
        <div className="sign-up-form-container">
          <UI.H1 className="sign-up-h1">Sign Up</UI.H1>
          <form>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group">email</UI.Label>
              <UI.TextField id="emailTextField" name="email" type="email" placeholder="Email" noValidate/>
            </div>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group">password</UI.Label>
              <UI.TextField id="passwordTextField" name="password" type="password" placeholder="Password" noValidate/>
            </div>
            <div className="login-form-group">
              <UI.Label htmlFor="form-group">repeat password</UI.Label>
              <UI.TextField id="repeatPasswordTextField" name="repeatPassword" type="password" placeholder="Repeat Password" noValidate/>
            </div>
          </form>
          <div className="sign-up-button-group">
            <UI.Button primary id="createAccountButton" className="create-account-button" type="submit">Create Account</UI.Button>
          </div>
          <UI.HintButton id="signUpButton" type="button" onClick={() => this.props.history.push('/login')}>I already have an account</UI.HintButton>
        </div>
      </div>
    );
  }
}

export default SignUp;