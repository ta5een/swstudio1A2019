import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import queryString from 'query-string';

import fire, { attemptGetCurrentUser } from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import Event from '../../../models/Event';
import './styles/EventDetails.css';

class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      query: queryString.parse(this.props.location.search),
      event: null,
      isLoading: true
    });

    console.log(this.state.query['event']);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Event`;
    let eventID = this.state.query['event'];

    if (eventID !== undefined && eventID !== null) {
      attemptGetCurrentUser(10)
        .then(_ => {
          fire.firestore().collection('events').doc(eventID).get()
            .then(eventDoc => {
              if (eventDoc.exists) {
                let eventData = eventDoc.data();

                fire.firestore().collection('charities').doc(eventData['organiser']).get()
                  .then(charityDoc => {
                    if (charityDoc.exists) {
                      let charityData = charityDoc.data();

                      fire.storage().ref().child(`events/${eventID}/cover.jpg`).getDownloadURL()
                        .then(coverURL => {
                          let retrievedEvent = new Event({
                            name: eventData['name'],
                            organiser: charityData['name'],
                            isOneDayEvent: eventData['is-one-day-event'],
                            start: new Date(eventData['event-start']),
                            end: new Date(eventData['event-end']),
                            details: JSON.parse(eventData['details']),
                            coverURL
                          });

                          document.title = `${Globals.app.name} – ${retrievedEvent.name}`;

                          this.setState({
                            event: retrievedEvent,
                            isLoading: false
                          }, () => console.log(this.state));
                        })
                        .catch(error => console.log(error));
                    }
                  })
                  .catch(error => console.log(error));
              }
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const loadingView = () => {
      const globalColours = require('../../../Globals').default.constants.styles.colours

      return (
        <div className="event-details-loading-container">
          <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
        </div>
      );
    }

    const eventDetailsView = () => {
      const event = this.state.event;

      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const eventStart = event.start.toLocaleString('en-AU', dateOptions);
      const eventEnd = event.end.toLocaleString('en-AU', dateOptions);

      return (
        <div className="event-details-contents">
          <div className="event-details-image-header">
            <img className="event-image" src={event.coverURL} alt={event.name}/>
          </div>
          <div className="event-details-info">
            <div className="event-details-heading-group">
              <UI.Heading>{event.name}</UI.Heading>
              <UI.Label>{event.organiser.toUpperCase()}</UI.Label>
              <p>{event.isOneDayEvent ? `${eventStart}` : `${eventStart} - ${eventEnd}`}</p>
            </div>
            {event.details.split('\n').map((item, key) => {
              return (<p key={`${event.name}-${key}`}>{item}</p>);
            })}
          </div>
        </div>
      );
    }

    const getBody = () => {
      if (!this.state.isLoading && this.state.event) {
        return eventDetailsView();
      } else {
        return loadingView();
      }
    }

    return (
      <div className="event-details-wrapper">
        <UI.BackButton override={true} to={() => this.props.history.push('/home')} from={this}/>
        <div className="event-details-body">
          {getBody()}
        </div>
      </div>
    );
  }
}

export default withRouter(EventDetails);