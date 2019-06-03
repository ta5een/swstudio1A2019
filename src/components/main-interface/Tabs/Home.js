import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import queryString from 'query-string';

import fire, { attemptGetCurrentUser } from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      query: queryString.parse(this.props.location.search),
      user: null,
      isCharityOrg: JSON.parse(localStorage.getItem('is-charity-organiser')),
      retrievedEvents: [],
      isLoading: true
    });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Home`;

    const getCharityUserData = (user) => {
      if (localStorage.getItem('retrieved-events') !== null) {
        this.setState({
          user,
          isCharityOrg: true,
          retrievedEvents: JSON.parse(localStorage.getItem('retrieved-events')),
          isLoading: false
        });
      } else {
        fire.firestore().collection('charities').doc(user.uid).get()
        .then(charityDoc => {
          if (charityDoc.exists) {
            let charityData = charityDoc.data();

            this.setState({
              user,
              isCharityOrg: true,
              retrievedEvents: [],
            }, () => {
              charityData['organised-events'].map(event => {
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
                                    retrievedEvents: {
                                      ...this.state.retrievedEvents,
                                      [event]: {
                                        name: eventData['name'],
                                        organiser: charityData['name'],
                                        coverURL
                                      }
                                    },
                                    isLoading: false
                                  }, () => {
                                    console.log(this.state.userData);
                                    localStorage.setItem('retrieved-events', JSON.stringify(this.state.retrievedEvents));
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
    }

    const getVolunteerUserData = (user) => {
      if (localStorage.getItem('retrieved-events') !== null) {
        this.setState({
          user,
          isCharityOrg: false,
          retrievedEvents: JSON.parse(localStorage.getItem('retrieved-events')),
          isLoading: false
        });
      } else {
        fire.firestore().collection('events').get()
          .then(eventsDoc => {
            this.setState({
              user,
              isCharityOrg: false
            }, () => {
              let retrievedEvents = {};

              eventsDoc.docs.map(doc => {
                let eventData = doc.data();

                fire.firestore().collection('charities').doc(eventData['organiser']).get()
                  .then(charityDoc => {
                    if (charityDoc.exists) {
                      let charityData = charityDoc.data();

                      fire.storage().ref().child(`events/${doc.id}/cover.jpg`).getDownloadURL()
                        .then(coverURL => {
                          retrievedEvents = {
                            ...retrievedEvents,
                            [doc.id]: {
                              name: eventData['name'],
                              organiser: charityData['name'],
                              coverURL
                            }
                          }

                          this.setState({
                            retrievedEvents,
                            isLoading: false
                          }, () => {
                            localStorage.setItem('retrieved-events', JSON.stringify(this.state.retrievedEvents));
                          });
                        })
                        .catch(error => console.log(error));
                    }
                  })
                  .catch(error => console.log(error));
              });
            });
          })
          .catch(error => console.log(error));
      }
    }

    attemptGetCurrentUser(10)
      .then(user => {
        fire.firestore().collection('users').doc(user.uid).get()
          .then(userDoc => {
            if (userDoc.exists) {
              let userData = userDoc.data();

              if (userData['is-charity-organiser']) {
                getCharityUserData(user);
              } else {
                getVolunteerUserData(user);
              }
            }
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/login?kicked-out=yes');
      });

    if (this.state.query['tour']) {
      this.showTour();
    }
  }

  showTour() {
    console.log("UNIMPLEMENTED");
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

    const volunteerCardView = () => {
      const buildCards = () => {
        let retrievedEvents = this.state.retrievedEvents;

        if (retrievedEvents !== undefined) {
          if (Object.keys(retrievedEvents).length > 0) {
            return Object.keys(retrievedEvents).map(event => {
              return (
                <UI.EventCard
                  key={event}
                  name={retrievedEvents[event].name}
                  organisation={retrievedEvents[event].organiser}
                  image={retrievedEvents[event].coverURL}/>
              );
            });
          } else {
            return (
              <UI.EmptyEventCard heading="It's quiet here" subheading="Why not start a new event from your profile?"/>
            );
          }
        } else {
          return (
            <UI.EmptyEventCard heading="It's quiet here" subheading="Why not start a new event from your profile?"/>
          );
        }
      }

      return (
        <div className="home-scrolling-container">
          {buildCards()}
        </div>
      );
    }

    const charityCardView = () => {
      const buildCards = () => {
        let retrievedEvents = this.state.retrievedEvents;

        console.log(retrievedEvents);
        console.log(Object.keys(retrievedEvents).length);

        if (retrievedEvents !== undefined) {
          if (Object.keys(retrievedEvents).length > 0) {
            return Object.keys(retrievedEvents).map(event => {
              return (
                <UI.EventCard
                  key={event}
                  name={retrievedEvents[event].name}
                  organisation={retrievedEvents[event].organiser}
                  image={retrievedEvents[event].coverURL}/>
              );
            });
          } else {
            return (
              <UI.EmptyEventCard heading="It's quiet here" subheading="Why not start a new event from your profile?"/>
            );
          }
        } else {
          return (
            <UI.EmptyEventCard heading="It's quiet here" subheading="Why not start a new event from your profile?"/>
          );
        }
      }

      return (
        <div className="home-scrolling-container">
          {buildCards()}
        </div>
      );
    }

    const getBody = () => {
      if (!this.state.isLoading && this.state.user && this.state.isCharityOrg) {
        return charityCardView();
      } else if (!this.state.isLoading && this.state.user) {
        return volunteerCardView();
      } else {
        return loadingView();
      }
    }

    return (
      <div className="home-wrapper">
        <div className="home-title-bar">
          <UI.TitleBar title="Home" hasSearchIcon={true}/>
        </div>
        <div className="home-body">
          {getBody()}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);