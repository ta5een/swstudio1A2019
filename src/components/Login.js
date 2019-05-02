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
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
      console.log("Signing in with user... ", user);
    }).catch((error) => {
      console.log(error);
    });
  }

  // Creates the user with specified email and password
  // Changes auth state on app.js and redirects to home.js
  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="outer">
        <div className="middle">
        <div className="inner">
          <h1>Time-Aid</h1>
          <form>
            <div className="label-textfield">
              <label>
                Email address{" "}
                <input value={this.state.email} type="email" onChange={this.handleChange} name="email" id="emailTextField"/>
              </label>
            </div>
            <div className="label-textfield">
              <label>
                Password{" "}
                <input value={this.state.password} type="password" onChange={this.handleChange} name="password" id="passwordTextField"/>
              </label>
            </div>
            <Button type="submit" disabled={true} onClick={this.login}>Login</Button>
            <Button primary disabled={true} onClick={this.signup}>Sign up</Button>
            <HintButton hint>Forgot your password?</HintButton>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;