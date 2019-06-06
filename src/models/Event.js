export default class Event {
  constructor({ name, organiser, isOneDayEvent, start, end, details, coverURL }) {
    this.name = name;
    this.organiser = organiser;
    this.isOneDayEvent = isOneDayEvent;
    this.start = start;
    this.end = end;
    this.details = details;
    this.coverURL = coverURL
  }
}