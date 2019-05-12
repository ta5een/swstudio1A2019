import React, { Component } from 'react';

import fire from '../config/Fire';
import AppDefaults from '../AppDefaults';
import * as UI from '../controls/UI';

class SignUp extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    document.title = `${AppDefaults.app.name} – Sign Up`;
  }

  render() {
    return (
      <h1>Sign Up</h1>
    );
  }
}

export default SignUp;