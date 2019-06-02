import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as UI from '../../../../../controls/UI';
import Globals from '../../../../../Globals';
import './styles/DateAndTimeSelection.css';

class TimeSelection extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state === undefined || this.props.location.state === null) {
      this.props.history.push('/new-event-details');
    }

    const now = new Date();
    const later = new Date();
    later.setTime(now.getTime() + (1 * 60 * 60 * 1000));

    this.state = ({
      ...this.props.location.state,
      eventStartTime: {
        hour: now.getHours(),
        minute: now.getMinutes().toString().padStart(2, '0'),
      },
      eventEndTime: {
        hour: later.getHours(),
        minute: later.getMinutes().toString().padStart(2, '0'),
      }
    });

    this.handleContinue = this.handleContinue.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Create Event`;
  }

  handleContinue() {
    this.props.history.push('/new-event-upload-image', { ...this.state });
  }

  render() {
    const range = (start, end) => {
      return Array(end - start + 1).fill().map((_, index) => String(start + index).padStart(2, '0'));
    }

    const handleStartTimeValueChange = (prevStates, state, e) => {
      this.setState({
        eventStartTime: {
          ...prevStates,
          [state]: e.target.value
        }
      }, () => console.log(this.state));
    }

    const handleEndTimeValueChange = (prevStates, state, e) => {
      this.setState({
        eventEndTime: {
          ...prevStates,
          [state]: e.target.value
        }
      }, () => console.log(this.state));
    }

    const eventStartProperites = {
      date: parseInt(this.state.eventStartDate.date),
      month: this.state.eventStartDate.month.index,
      year: parseInt(this.state.eventStartDate.year)
    };

    const eventEndProperties = {
      date: parseInt(this.state.eventEndDate.date),
      month: this.state.eventEndDate.month.index,
      year: parseInt(this.state.eventEndDate.year)
    };

    const getStartDate = () => {
      return new Date(eventStartProperites.year, eventStartProperites.month, eventStartProperites.date);
    }

    const getEndDate = () => {
      return new Date(eventEndProperties.year, eventEndProperties.month, eventEndProperties.date);
    }

    const isEnabled = () => {
      const startHour = this.state.eventStartTime.hour;
      const endHour = this.state.eventEndTime.hour;

      let eventStart = {
        ...eventStartProperites,
        hour: startHour,
        minute: parseInt(this.state.eventStartTime.minute),
      }

      let eventEnd = {
        ...eventEndProperties,
        hour: endHour,
        minute: parseInt(this.state.eventEndTime.minute),
      }

      let eventStartDate = new Date(eventStart.year, eventStart.month, eventStart.date, eventStart.hour, eventStart.minute);
      let eventEndDate = new Date(eventEnd.year, eventEnd.month, eventEnd.date, eventEnd.hour, eventEnd.minute);

      return (eventEndDate > eventStartDate);
    }

    return (
      <div className="date-time-selection-wrapper">
        <UI.BackButton override={true} to={() => this.props.history.push('/new-event-date', { ...this.state })} from={this}/>
        <div className="date-time-selection-content">
          <div className="date-time-selection-heading-group">
            <UI.Heading>Nearly there</UI.Heading>
            <UI.Subheading>What time does "{this.state.eventName}" begin and end?</UI.Subheading>
          </div>
          <div className="date-time-selection-form">
            <UI.Label className="date-time-label">Time start</UI.Label>
            <UI.Label className="date-time-label-small">(on {getStartDate().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })})</UI.Label>
            <div className="date-time-selection-time-picker">
              <UI.PickerView
                id="startHourPickerView"
                options={range(0, 24)}
                value={this.state.eventStartTime.hour}
                onChange={handleStartTimeValueChange.bind(this, this.state.eventStartTime, 'hour')}/>
              <UI.PickerView
                id="startMinutePickerView"
                options={range(0, 59)}
                value={this.state.eventStartTime.minute.toString().padStart(2, '0')}
                onChange={handleStartTimeValueChange.bind(this, this.state.eventStartTime, 'minute')}/>
            </div>
          </div>
          <div className="date-time-selection-form">
            <UI.Label className="date-time-label">Time end</UI.Label>
            <UI.Label className="date-time-label-small">({this.state.isOneDayEvent ? "on the same day" : `each day until ${getEndDate().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`})</UI.Label>
            <div className="date-time-selection-date-picker">
              <UI.PickerView
                id="endHourPickerView"
                options={range(0, 24)} value={this.state.eventEndTime.hour}
                onChange={handleEndTimeValueChange.bind(this, this.state.eventEndTime, 'hour')}
                flex={5}/>
              <UI.PickerView
                id="endMinutePickerView"
                options={range(0, 59)} value={this.state.eventEndTime.minute.toString().padStart(2, '0')}
                onChange={handleEndTimeValueChange.bind(this, this.state.eventEndTime, 'minute')}
                flex={1}/>
            </div>
          </div>
          <div className="date-time-selection-continue-button-container">
            <UI.Button primary id="continueButton" type="submit" disabled={!isEnabled()} onClick={this.handleContinue}>CONTINUE</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TimeSelection);