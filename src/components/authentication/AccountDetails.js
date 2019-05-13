import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import fire from '../../config/Fire';
// import AppDefaults from '../../AppDefaults';
import * as UI from '../../controls/UI';
import './styles/AccountDetails.css';

class AccountDetails extends Component {
  render() {
    return (
      <div className="account-details-wrapper">
        <div className="account-details-form-container">
          <div className="account-details-heading-group">
            <UI.Heading className="account-details-heading">Almost there</UI.Heading>
            <UI.Subheading>Let's personalise your profile</UI.Subheading>
          </div>
          <div id="infoBoxDiv" className="account-details-info-box-div" hidden={true}/>
          <div className="account-details-button-group">
            <UI.Button id="backButton" className="back-button" onClick={() => this.props.history.goBack()}>Back</UI.Button>
            <UI.Button primary id="createAccountButton" className="create-account-button">Create Account</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountDetails);