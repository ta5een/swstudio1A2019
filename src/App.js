import React, { Component } from 'react';
import fire from './config/Fire';
import Home from './components/main-interface/Home';
import Login from './components/authentication/Login';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = ({
      user: null,
    });

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log("Currently signed in user: " + user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? <Home/> : <Login/> }
      </div>
    );
  }
}

export default App;