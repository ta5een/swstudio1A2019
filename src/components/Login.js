import React, { Component } from 'react';
import fire from '../config/Fire';
import './Login.css'

import { Button, HintButton } from '../controls/Button'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    document.title = "TimeAid – Login"
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Calls Firebases signInWithEmailAndPassword()
  // Uses email and password passed by user
  // Changes auth state on app.js and redirects to home.js
  login(e) {
    e.preventDefault();

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
        console.log(error);
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
    return (
      <div className="outer">
        <div className="middle">
        <h1>Time Aid</h1>
        <div className="inner">
          <form>
            <div className="label-textfield">
              <label>
                Email{" "}
                <input value={this.state.email} type="email" onChange={this.handleChange} name="email" id="emailTextField"/>
              </label>
            </div>
            <div className="label-textfield">
              <label>
                Password{" "}
                <input value={this.state.password} type="password" onChange={this.handleChange} name="password" id="passwordTextField"/>
              </label>
            </div>
            <div>
              <div>
                <Button type="submit" disabled={true} onClick={this.login}>Login</Button>
                <Button primary disabled={true} onClick={this.signup}>Sign up</Button>
              </div>
              <HintButton onClick={this.forgotPassword}>Forgot your password?</HintButton>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;