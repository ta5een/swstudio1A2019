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

    attemptGetCurrentUser(10)
      .then(user => {
        if (localStorage.getItem('booked-events') !== null) {
          this.setState({
            user,
            bookedEvents: JSON.parse(localStorage.getItem('booked-events')),
            isLoading: false
          });
        } else {
          fire.firestore().collection('volunteers').doc(user.uid).get()
            .then(volunteerDoc => {
              if (volunteerDoc.exists) {
                let volunteerData = volunteerDoc.data();

                this.setState({
                  user,
                  isCharityOrg: true,
                  bookedEvents: [],
                }, () => {
                  volunteerData['booked-events'].map(event => {
                    fire.firestore().collection('events').doc(event).get()
                      .then(eventDoc => {
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
                        }
                      })
                      .catch(error => console.log(error));
                  });
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
        <div className="home-loading-container">
          <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
        </div>
      );
    }

    const bookedEventsView = () => {
      const buildCards = () => {
        let bookedEvents = this.state.bookedEvents;

        console.log(bookedEvents);
        console.log(Object.keys(bookedEvents).length);

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
          }
        }
      }

      return (
        <div className="bookings-container">
          {buildCards()}
        </div>
      );
    }

    const getBody = () => {
      console.log(this.state.user)
      // console.log(this.state.isLoading)
      // console.log(!this.state.isLoading && this.state.user)

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