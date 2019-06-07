import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import fire, { attemptGetCurrentUser } from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Favourites.css';

class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      user: null,
      favouriteEvents: [],
      isLoading: true
    });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Favourites`;
    this.getData();
  }

  getData() {
attemptGetCurrentUser(10)
      .then(user => {
        if (localStorage.getItem('favourite-events') !== null) {
          this.setState({
            user,
            favouriteEvents: JSON.parse(localStorage.getItem('favourite-events')),
            isLoading: false
          }, () => console.log(this.state));
        } else {
          fire.firestore().collection('volunteers').doc(user.uid).get()
            .then(volunteerDoc => {
              if (volunteerDoc.exists) {
                let volunteerData = volunteerDoc.data();
                let favouriteEvents = volunteerData['favourite-events'];

                this.setState({
                  user,
                  isCharityOrg: true,
                  favouriteEvents: [],
                }, () => {
                  if (favouriteEvents.length > 0) {
                    favouriteEvents.map(event => {
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
                                        favouriteEvents: {
                                          ...this.state.favouriteEvents,
                                          [event]: {
                                            name: eventData['name'],
                                            organiser: charityData['name'],
                                            coverURL
                                          }
                                        },
                                        isLoading: false
                                      }, () => {
                                        console.log(this.state);
                                        localStorage.setItem('favourite-events', JSON.stringify(this.state.favouriteEvents));
                                      });
                                    })
                                    .catch(error => console.log(error));
                                }
                              })
                              .catch(error => console.log(error));
                          } else {
                            console.log(`Event with ID ${event} does not exist!`);
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
        <div className="favourites-loading-container">
          <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
        </div>
      );
    }

    const bookedEventsView = () => {
      const buildCards = () => {
        let favouriteEvents = this.state.favouriteEvents;
        console.log(favouriteEvents);

        if (favouriteEvents !== undefined) {
          if (Object.keys(favouriteEvents).length > 0) {
            return Object.keys(favouriteEvents).map(event => {
              return (
                <UI.SmallEventCard
                  key={event}
                  name={favouriteEvents[event].name}
                  organisation={favouriteEvents[event].organiser}
                  image={favouriteEvents[event].coverURL}/>
              );
            });
          } else {
            return (
              <UI.EmptyEventCard heading="It's quiet here" subheading="Start adding events to your favourites to see them here."/>
            );
          }
        } else {
          return (
            <UI.EmptyEventCard heading="It's quiet here" subheading="Start adding events to your favourites to see them here."/>
          );
        }
      }

      return (
        <div className="favourites-container">
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
      <div className="favourites-wrapper">
        <div className="favourites-title-bar">
          <UI.TitleBar title="Favourites" hasSearchIcon={true}/>
        </div>
        <div className="favourites-body">
          {getBody()}
        </div>
      </div>
    );
  }
}

export default withRouter(Favourites);