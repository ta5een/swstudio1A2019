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
      isCharityOrg: false
    });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Home`;

    attemptGetCurrentUser(10)
      .then(user => {
        const charitiesDocRef = fire.firestore().doc('charities/' + user.uid);
        charitiesDocRef.get()
          .then(doc => this.setState({ user, isCharityOrg: doc.exists }))
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
      return (
        <div className="home-cards-container">
          <div className="home-card">
            <UI.EventCard image="/assets/events/clothing_store.jpg" name="Hand-Me-Downs" organisation="The Clothing Store"/>
          </div>
        </div>
      );
    }

    const charityCardView = () => {
      return (
        <div className="home-cards-container">
          <div className="home-card">
            <UI.EmptyEventCard/>
          </div>
        </div>
      );
    }

    const getBody = () => {
      if (this.state.user && this.state.isCharityOrg) {
        return charityCardView();
      } else if (this.state.user) {
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