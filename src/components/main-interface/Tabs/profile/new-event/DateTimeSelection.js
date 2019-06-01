import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as UI from '../../../../../controls/UI';
import './styles/DateTimeSelection.css';

const months =
  ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

class DateTimeSelection extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setFullYear(today.getFullYear());

    if (!this.props.location.state) {
      this.props.history.push('/new-event-details');
    }

    this.state = ({
      eventName: this.props.location.state.eventName || null,
      eventDetails: this.props.location.state.eventDetails || null,
      eventStartDate: {
        date: today.getDate().toString().padStart(2, '0'),
        month: {
          fullName: months[today.getMonth()],
          index: today.getMonth()
        },
        year: today.getFullYear().toString()
      },
      eventEndDate: {
        date: tomorrow.getDate().toString().padStart(2, '0'),
        month: {
          fullName: months[tomorrow.getMonth()],
          index: tomorrow.getMonth()
        },
        year: tomorrow.getFullYear().toString()
      },
      isOneDayEvent: true
    });

    this.handleContinue = this.handleContinue.bind(this);
  }

  componentDidMount() {
    document.getElementById('endDateForm').style.display = 'none';
  }

  handleContinue() {
    this.props.history.push('/new-event-time', { ...this.state });
  }

  render() {
    const range = (start, end) => {
      return Array(end - start + 1).fill().map((_, index) => String(start + index).padStart(2, '0'));
    }

    const isLeapYear = (year) => {
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    const getDateRange = (date) => {
      const month = date.month.fullName;
      const year = date.year;

      if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
        return range(1, 30);
      } else if (month === 'February') {
        if (isLeapYear(year)) {
          return range(1, 29);
        } else {
          return range(1, 28);
        }
      } else {
        return range(1, 31);
      }
    }

    let startDateRange = getDateRange(this.state.eventStartDate);
    let endDateRange = getDateRange(this.state.eventEndDate);

    const handleCheckboxClick = e => {
      this.setState({ isOneDayEvent: e.target.checked });

      if (!this.state.isOneDayEvent) {
        document.getElementById('endDateForm').style.display = 'none';
      } else {
        document.getElementById('endDateForm').style.display = 'block';
      }
    }

    const handleStartDateValueChange = (prevStates, state, e) => {
      if (state === 'month') {
        this.setState({
          eventStartDate: {
            ...prevStates,
            month: {
              fullName: months[e.target.selectedIndex],
              index: e.target.selectedIndex
            }
          }
        }, () => console.log(this.state));
      } else {
        this.setState({
          eventStartDate: {
            ...prevStates,
            [state]: e.target.value
          }
        }, () => console.log(this.state));
      }
    }

    const handleEndDateValueChange = (prevStates, state, e) => {
      if (state === 'month') {
        this.setState({
          eventEndDate: {
            ...prevStates,
            month: {
              fullName: months[e.target.selectedIndex],
              index: e.target.selectedIndex
            }
          }
        }, () => console.log(this.state));
      } else {
        this.setState({
          eventEndDate: {
            ...prevStates,
            [state]: e.target.value
          }
        }, () => console.log(this.state));
      }
    }

    const isEnabled = () => {
      let eventStart = {
        date: parseInt(this.state.eventStartDate.date),
        month: this.state.eventStartDate.month.index,
        year: parseInt(this.state.eventStartDate.year)
      }

      let eventEnd = {
        date: parseInt(this.state.eventEndDate.date),
        month: this.state.eventEndDate.month.index,
        year: parseInt(this.state.eventEndDate.year)
      }

      return (this.state.isOneDayEvent
              || ((eventEnd.date >= eventStart.date)
              && (eventEnd.month >= eventStart.month)
              && (eventEnd.year >= eventStart.year)));
    }

    return (
      <div className="date-selection-wrapper">
        <UI.BackButton to="/new-event-details" from={this}/>
        <div className="date-selection-content">
          <div className="date-selection-heading-group">
            <UI.Heading>When's it happening?</UI.Heading>
            <UI.Subheading>Fill in when "{this.state.eventName}" will start and end</UI.Subheading>
          </div>
          <div id="startDateForm" className="date-selection-form">
            <UI.Label htmlFor="labeled-textfield">start date</UI.Label>
            <div className="date-selection-date-picker">
              <UI.PickerView id="startDatePickerView" options={startDateRange} value={this.state.eventStartDate.date.padStart(2, '0')} onChange={handleStartDateValueChange.bind(this, this.state.eventStartDate, 'date')}/>
              <UI.PickerView id="startMonthPickerView" options={months} value={this.state.eventStartDate.month.fullName} flex={3} onChange={handleStartDateValueChange.bind(this, this.state.eventStartDate, 'month')}/>
              <UI.PickerView id="startYearPickerView" options={range(2019, 2030)} value={this.state.eventStartDate.year.toString()} flex={2} onChange={handleStartDateValueChange.bind(this, this.state.eventStartDate, 'year')}/>
            </div>
          </div>
          <div id="endDateForm" className="date-selection-form">
            <UI.Label htmlFor="labeled-textfield">end date</UI.Label>
            <div className="date-selection-date-picker">
              <UI.PickerView id="endDatePickerView" options={endDateRange} value={this.state.eventEndDate.date.padStart(2, '0')} onChange={handleEndDateValueChange.bind(this, this.state.eventEndDate, 'date')}/>
              <UI.PickerView id="endMonthPickerView" options={months} value={this.state.eventEndDate.month.fullName} flex={3} onChange={handleEndDateValueChange.bind(this, this.state.eventEndDate, 'month')}/>
              <UI.PickerView id="endYearPickerView" options={range(2019, 2030)} value={this.state.eventEndDate.year} flex={2} onChange={handleEndDateValueChange.bind(this, this.state.eventEndDate, 'year')}/>
            </div>
          </div>
          <div className="date-selection-checkbox-container">
            <input id="oneDayEventCheckbox" className="date-selection-checkbox" type="checkbox" name="is-one-day-event" defaultChecked={this.state.isOneDayEvent} onClick={handleCheckboxClick.bind(this)}/>
            <label htmlFor="is-one-day-event">This event only goes for one day</label>
          </div>
          {/* <form className="date-selection-form">
            <UI.Label htmlFor="labeled-textfield">time start</UI.Label>
            <div className="date-selection-time-picker">
              <UI.PickerView id="hourPickerView" options={range(1, 12)}/>
              <UI.PickerView id="minutePickerView" options={range(0, 59)} onChange={() => console.log('I was changed')}/
              <UI.PickerView id="periodPickerView" options={["AM", "PM"]}/>
            </div>
          </form> */}
          <div className="date-selection-continue-button-container">
            <UI.Button primary id="continueButton" type="submit" disabled={!isEnabled()} onClick={this.handleContinue}>CONTINUE</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DateTimeSelection);