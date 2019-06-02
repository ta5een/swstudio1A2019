import React, { Component, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import fire, { attemptGetCurrentUser } from '../../../../../config/Fire';
import Globals from '../../../../../Globals';
import * as UI from '../../../../../controls/UI';
import './styles/Submit&Finish.css';

class SubmitAndFinish extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.state);

    if (this.props.location.state === undefined || this.props.location.state === null) {
      this.props.history.push('/new-event-details');
    }

    this.state = ({
      ...this.props.location.state,
      isFinished: false
    });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Create Event`;

    attemptGetCurrentUser(10)
      .then(user => {
        let eventsDocRef = fire.firestore().collection('events/').doc();
        console.log(eventsDocRef.id);

        const eventStart = {
          date: parseInt(this.state.eventStartDate.date),
          month: this.state.eventStartDate.month.index,
          year: parseInt(this.state.eventStartDate.year),
          hour: this.state.eventStartTime.hour,
          minute: parseInt(this.state.eventStartTime.minute)
        };

        const eventEnd = {
          date: parseInt(this.state.eventEndDate.date),
          month: this.state.eventEndDate.month.index,
          year: parseInt(this.state.eventEndDate.year),
          hour: this.state.eventEndTime.hour,
          minute: parseInt(this.state.eventEndTime.minute)
        };

        let eventStartDate = new Date(eventStart.year, eventStart.month, eventStart.date, eventStart.hour, eventStart.minute);
        let eventEndDate = new Date(eventEnd.year, eventEnd.month, eventEnd.date, eventEnd.hour, eventEnd.minute);

        console.log(eventStartDate);
        console.log(eventEndDate);

        let data = {
          'organiser': user.uid,
          'name': this.state.eventName,
          'details': JSON.stringify(this.state.eventDetails),
          'is-one-day-event': this.state.isOneDayEvent,
          'event-start': eventStartDate.toISOString(),
          'event-end': eventEndDate.toISOString()
        }

        console.log("Adding document to `events` with properties...")
        eventsDocRef.set({ data }, { merge: true })
          .then(() => {
            let organisedEvents = [];

            fire.firestore().collection('charities').doc(user.uid).get()
              .then(doc => {
                if (doc.exists) {
                  let events = [];
                  let data = doc.data();

                  Object.keys(data["organised-events"]).map((key) => {
                    events.push(data[key]);
                  });

                  organisedEvents = events.flat();
                }

                let storageRef = fire.storage().ref();
                let eventCoverRef = storageRef.child(`events/${eventsDocRef.id}/cover.jpg`);

                console.log("Adding event cover to storage...");
                eventCoverRef.putString(this.state.eventCover, 'data_url')
                  .then(() => {
                    console.log("Adding event key to organised events array...");
                    fire.firestore().collection('charities').doc(user.uid).set({
                      'organised-events': [...organisedEvents, eventsDocRef.id]
                    }, { merge: true })
                    .then(() => this.setState({ isFinished: true }))
                    .catch(error => console.log(error));
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/home');
      });
  }

  render() {
    const submittingView = () => {
      const globalColours = Globals.constants.styles.colours

      return (
        <>
          <div className="submitting-message">
            <UI.Heading>Creating event...</UI.Heading>
            <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
            <UI.Subheading id="submit-finish-subheading">Sit back while we register your event to {Globals.app.name}</UI.Subheading>
          </div>
        </>
      );
    }

    const finishedView = () => {
      return (
        <>
          <div className="finished-message">
            <img src="/assets/icons/tick.svg" alt="tick"/>
            <UI.Heading>Event created</UI.Heading>
            <UI.Subheading id="submit-finish-subheading">Your new event is ready to be volunteered in!</UI.Subheading>
          </div>
          <div className="submit-finish-button-group">
            <UI.Button primary onClick={() => this.props.history.push('/home')}>GO HOME</UI.Button>
          </div>
        </>
      );
    }

    return (
      <div className="submit-finish-wrapper">
        <div className="submit-finish-content">
          {this.state.isFinished ? finishedView() : submittingView()}
        </div>
      </div>
    );
  }
}

export default withRouter(SubmitAndFinish);