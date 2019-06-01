import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Globals from '../../../../../Globals';
import * as UI from '../../../../../controls/UI';
import './styles/CreateEvent.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      eventName: "",
      eventDetails: ""
    });

    this.handleContinue = this.handleContinue.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Create Event`;
  }

  handleContinue() {
    this.props.history.push('/new-event-date', { eventName: this.state.eventName, eventDetails: this.state.eventDetails });
  }

  render() {
    const isEnabled = this.state.eventName.length > 0;

    const handleEventNameTextFieldChange = e => {
      this.setState({ eventName: e.target.value });
    }

    const handleEventDetailsTextAreaChange = e => {
      this.setState({ eventDetails: e.target.value });
    }

    const focusEventDetailsTextArea = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('eventDetailsTextArea', {  }).focus();
      }
    }

    return (
      <div className="create-event-wrapper">
        <UI.BackButton to="/profile" from={this}/>
        <div className="create-event-content">
          <div className="create-event-heading-group">
            <UI.Heading>New event</UI.Heading>
            <UI.Subheading>Awesome, let's start by filling in some details</UI.Subheading>
          </div>
          <form className="create-event-form">
            <div className="create-event-labeled-textfield">
              <UI.Label htmlFor="labeled-textfield">event name</UI.Label>
              <UI.TextField id="eventNameTextField" name="event-name" type="text" placeholder="Event name" value={this.state.eventName} onChange={handleEventNameTextFieldChange.bind(this)} onKeyPress={focusEventDetailsTextArea.bind(this)} noValidate/>
            </div>
            <div className="create-event-labeled-textfield">
              <UI.Label htmlFor="labeled-textfield">event details</UI.Label>
              <UI.TextArea id="eventDetailsTextArea" name="event-details" type="text" placeholder="What is your event for? Make sure to be concise and impactful." rows={8} value={this.state.eventDetails} onChange={handleEventDetailsTextAreaChange.bind(this)} /* onKeyPress={focusEventDetailsTextArea.bind(this)} */ noValidate/>
            </div>
          </form>
          <div className="create-event-continue-button-container">
            <UI.Button primary id="continueButton" type="submit" disabled={!isEnabled} onClick={this.handleContinue}>CONTINUE</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateEvent);