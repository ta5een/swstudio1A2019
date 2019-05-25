import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as UI from '../../../controls/UI';
import './styles/RoleSelection.css';

class RoleSelection extends Component {
  render() {
    const handleSelection = selection => {
      this.props.history.push('/create-account', { selectedRole: selection });
    }

    return(
      <div className="role-selection-wrapper">
        <UI.BackButton to="/start" from={this}/>
        <div className="role-selection-content">
          <div className="role-selection-heading-group">
            <UI.Heading>First time?</UI.Heading>
            <UI.Subheading>Let's start by selecting your role</UI.Subheading>
          </div>
          <div className="role-selection-cards-container">
            <UI.RoleCard image="/assets/low-res/volunteer.jpg" label="I'm a volunteer" description="I want to help make a difference in making the world a better place." onClick={handleSelection.bind(this, 'volunteer')}/>
            <UI.RoleCard image="/assets/low-res/charity_organiser.jpg" label="I'm a charity organiser" description="I want to create, organise, and hold events that enthusiastic patrons can participate in." onClick={handleSelection.bind(this, 'charity')}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RoleSelection);