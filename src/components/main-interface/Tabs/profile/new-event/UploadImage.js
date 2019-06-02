import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import { attemptGetCurrentUser } from '../../../../../config/Fire';
import Globals from '../../../../../Globals';
import * as UI from '../../../../../controls/UI';
import './styles/UploadImage.css';

class UploadImage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.state);

    if (this.props.location.state === undefined || this.props.location.state === null) {
      this.props.history.push('/new-event-details');
    }

    this.state = ({
      ...this.props.location.state,
      username: "",
      isLoading: true,
      canSubmitForm: false,
      eventCover: null,
    });

    this.handleFinish = this.handleFinish.bind(this);
  }

  handleFinish() {
    this.props.history.push('/new-event-submit', { ...this.state });
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Create Event`;

    attemptGetCurrentUser(10)
      .then(user => {
        this.setState({ username: user.displayName, isLoading: false });

        const reader = new FileReader();
        const fileInput = document.getElementById('eventCardImageInput');
        const eventCardImage = document.getElementById('eventCardImage');

        fileInput.addEventListener('change', e => {
          const file = e.target.files[0];
          reader.readAsDataURL(file);
        });

        reader.onload = e => {
          console.log(reader.result);
          eventCardImage.src = e.target.result;
          this.setState({ canSubmitForm: true, eventCover: reader.result });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const loading = () => {
      const globalColours = require('../../../../../Globals').default.constants.styles.colours

      return (
        <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
      );
    }

    const eventCard = () => {
      return (
        <UI.EventCardUpload name={this.state.eventName} organisation={this.state.username}/>
      );
    }

    return (
      <div className="upload-image-wrapper">
        <UI.BackButton override={true} to={() => this.props.history.push('/new-event-time', { ...this.state })} from={this}/>
        <div className="upload-image-content">
          <div className="upload-image-heading-group">
            <UI.Heading>One more thing</UI.Heading>
            <UI.Subheading>Let's upload a cover image for "{this.state.eventName}". Remember, it'll be one of the first things volunteers will see</UI.Subheading>
          </div>
          <div className="upload-image-event-card-container">
            {this.state.isLoading ? loading() : eventCard()}
          </div>
          <div className="upload-image-finish-button-container">
            <UI.Button primary id="finishButton" type="submit" /* disabled={!this.state.canSubmitForm} */ onClick={this.handleFinish}>FINISH</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadImage);