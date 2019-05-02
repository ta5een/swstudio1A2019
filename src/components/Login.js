import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import fire from '../config/Fire';
// import styled, { css } from 'styled-components'

import Button from '../controls/Button'

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
      <div className="col-md-6">
      <h1>Time-Aid</h1>
        {/*
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <Button type="submit" onClick={this.login} class="btn btn-primary">Login</Button>
          <Button primary onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</Button>
        </form>
        */}
        <form>
          <div class="form-group">
            <label>
              Email address{" "}
              <input value={this.state.email} type="email" onChange={this.handleChange} name="email" class="form-control" id="emailTextField"/>
            </label>
          </div>
          <div class="form-group">
            <label>
              Password{" "}
              <input value={this.state.password} type="password" onChange={this.handleChange} name="password" class="form-control" id="passwordTextField"/>
            </label>
          </div>
          <Button type="submit" onClick={this.login} class="btn btn-primary">Login</Button>
          <Button primary disabled={true} onClick={this.signup} className="btn btn-success">Sign up</Button>
          <Button hint class="btn btn-primary">Forgot password?</Button>
        </form>
      </div>
    );
  }
}

export default Login;