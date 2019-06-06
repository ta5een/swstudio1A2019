import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import fire, { attemptGetCurrentUser } from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Bookings.css';

class Bookings extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: null,
      bookedEvents: [],
      isLoading: true
    });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Bookings`;
    this.getData();
  }

  getData() {
    attemptGetCurrentUser(10)
      .then(user => {
        if (localStorage.getItem('booked-events') !== null) {
          this.setState({
            user,
            bookedEvents: JSON.parse(localStorage.getItem('booked-events')),
            isLoading: false
          }, () => console.log(this.state));
        } else {
          fire.firestore().collection('volunteers').doc(user.uid).get()
            .then(volunteerDoc => {
              if (volunteerDoc.exists) {
                let volunteerData = volunteerDoc.data();
                let events = volunteerData['booked-events'];

                this.setState({
                  user,
                  isCharityOrg: true,
                  bookedEvents: [],
                }, () => {
                  if (events.length > 0) {
                    events.map(event => {
                      fire.firestore().collection('events').doc(event).get()
                        .then(eventDoc => {
                          console.log(event)

                          if (eventDoc.exists) {
                            let eventData = eventDoc.data();

                            fire.firestore().collection('charities').doc(eventData['organiser']).get()
                              .then(charityDoc => {
                                if (charityDoc.exists) {
                                  let charityData = charityDoc.data();

                                  fire.storage().ref().child(`events/${event}/cover.jpg`).getDownloadURL()
                                    .then(coverURL => {
                                      this.setState({
                                        bookedEvents: {
                                          ...this.state.bookedEvents,
                                          [event]: {
                                            name: eventData['name'],
                                            organiser: charityData['name'],
                                            coverURL
                                          }
                                        },
                                        isLoading: false
                                      }, () => {
                                        console.log(this.state);
                                        localStorage.setItem('booked-events', JSON.stringify(this.state.bookedEvents));
                                      });
                                    })
                                    .catch(error => console.log(error));
                                }
                              })
                              .catch(error => console.log(error));
                          } else {
                            console.log(`Event with ID '${event}' does not exist!`);
                          }
                        })
                        .catch(error => console.log(error));
                    });
                  } else {
                    this.setState({ isLoading: false })
                  }
                });
              }
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const loadingView = () => {
      const globalColours = require('../../../Globals').default.constants.styles.colours

      return (
        <div className="bookings-loading-container">
          <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
        </div>
      );
    }

    const bookedEventsView = () => {
      const buildCards = () => {
        let bookedEvents = this.state.bookedEvents;
        console.log(bookedEvents);

        if (bookedEvents !== undefined) {
          if (Object.keys(bookedEvents).length > 0) {
            return Object.keys(bookedEvents).map(event => {
              return (
                <UI.EventCard
                  key={event}
                  name={bookedEvents[event].name}
                  organisation={bookedEvents[event].organiser}
                  image={bookedEvents[event].coverURL}/>
              );
            });
          } else {
            return (
              <UI.EmptyEventCard heading="It's quiet here" subheading="Start booking events to see them listed here."/>
            );
          }
        } else {
          return (
            <UI.EmptyEventCard heading="It's quiet here" subheading="Start booking events to see them listed here."/>
          );
        }
      }

      return (
        <div className="bookings-container">
          {buildCards()}
        </div>
      );
    }

    const getBody = () => {
      if (!this.state.isLoading && this.state.user) {
        return bookedEventsView();
      } else {
        return loadingView();
      }
    }

    return (
      <div className="bookings-wrapper">
        <div className="bookings-title-bar">
          <UI.TitleBar title="Bookings" hasSearchIcon={true}/>
        </div>
        <div className="bookings-body">
          {getBody()}
        </div>
      </div>
    );
  }
}

export default withRouter(Bookings);