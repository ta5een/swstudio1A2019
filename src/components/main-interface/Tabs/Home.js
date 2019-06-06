import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import queryString from 'query-string';

import fire, { attemptGetCurrentUser } from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Home.css';

let pStart = { x: 0.0, y: 0.0 };
let pEnd = { x: 0.0, y: 0.0 };

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      query: queryString.parse(this.props.location.search),
      user: null,
      isCharityOrg: JSON.parse(localStorage.getItem('is-charity-organiser')),
      retrievedEvents: [],
      isLoading: true,
      requestedRefresh: false
    });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Home`;
    this.addEventListeners();
    this.getData();

    if (this.state.query['tour']) {
      this.showTour();
    }
  }

  getData() {
    const getCharityUserData = (user) => {
      if (!this.state.requestedRefresh && localStorage.getItem('retrieved-events') !== null) {
        console.log(JSON.parse(localStorage.getItem('retrieved-events')));

        this.setState({
          user,
          isCharityOrg: true,
          retrievedEvents: JSON.parse(localStorage.getItem('retrieved-events')),
          isLoading: false,
          requestedRefresh: false
        }, () => localStorage.setItem('user', JSON.stringify(this.state.user)));
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
              localStorage.setItem('user', JSON.stringify(this.state.user));

              charityData['organised-events'].map((event) => {
                fire.firestore().collection('events').doc(event).get()
                  .then(eventDoc => {
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
                                  isLoading: false,
                                  requestedRefresh: false
                                }, () => {
                                  console.log(this.state.userData);
                                  localStorage.setItem('retrieved-events', JSON.stringify(this.state.retrievedEvents));
                                });
                            })
                            .catch(error => console.log(error));
                        }
                      })
                      .catch(error => console.log(error));
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
      if (!this.state.requestedRefresh && localStorage.getItem('retrieved-events') !== null) {
        console.log(JSON.parse(localStorage.getItem('retrieved-events')));

        this.setState({
          user,
          isCharityOrg: false,
          retrievedEvents: JSON.parse(localStorage.getItem('retrieved-events')),
          isLoading: false,
          requestedRefresh: false
        }, () => localStorage.setItem('user', JSON.stringify(this.state.user)));
      } else {
        fire.firestore().collection('events').get()
        .then(eventsDoc => {
          this.setState({
            user,
            isCharityOrg: false
          }, () => {
            localStorage.setItem('user', JSON.stringify(this.state.user));

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
                          isLoading: false,
                          requestedRefresh: false
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
  }

  addEventListeners() {
    document.addEventListener('touchstart', e => this.swipeStart(e), false);
    document.addEventListener('touchend', e => this.swipeEnd(e), false);
  }

  swipeStart(e) {
    if (typeof e.targetTouches !== "undefined") {
      pStart.x = e.targetTouches[0].screenX;
      pStart.y = e.targetTouches[0].screenY;
    } else {
      pStart.x = e.screenX;
      pStart.y = e.screenY;
    }
  }

  swipeEnd(e) {
    if (typeof e.changedTouches !== "undefined") {
      pEnd.x = e.changedTouches[0].screenX;
      pEnd.y = e.changedTouches[0].screenY;
    } else {
      pEnd.x = e.screenX;
      pEnd.y = e.screenY;
    }

    this.checkSwipe();
  }

  checkSwipe() {
    var change = {
      x: pStart.x - pEnd.x,
      y: pStart.y - pEnd.y
    }

    if (this.isPullDown(change.y, change.x)) {
      this.setState({ requestedRefresh: true }, this.getData());
    }
  }

  isPullDown(dy, dx) {
    return (dy < 0) && ((Math.abs(dx) <= 80 && Math.abs(dy) >= 200) || (Math.abs(dx) / Math.abs(dy) <= 0.3 && dy >= 60))
  }

  showTour() {
    console.log("UNIMPLEMENTED");
  }

  render() {
    const handleEventClick = selection => {
      this.props.history.push(`/event-details?event=${selection}`)
    }

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
              console.log(event);
              return (
                <UI.EventCard
                  key={event}
                  name={retrievedEvents[event].name}
                  organisation={retrievedEvents[event].organiser}
                  image={retrievedEvents[event].coverURL}
                  onClick={() => handleEventClick(event)}/>
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
        <img id="homeRefresh" className={this.state.requestedRefresh ? "home-refresh active" : "home-refresh"} src="/assets/icons/refresh.svg" alt="refresh"/>
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