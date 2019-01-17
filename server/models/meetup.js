/* eslint-disable no-restricted-syntax */
import uuid from 'uuid/v4';

class Meetup {
  constructor() {
    this.meetups = [];
  }

  createMeetup(data) {
    const newMeetup = {
      id: uuid(),
      createdOn: new Date(),
      location: data.location,
      images: data.images,
      topic: data.topic,
      happeningOn: data.happeningOn,
      tags: data.tags,
    };
    this.meetups.push(newMeetup);
    return newMeetup;
  }

  getTitle(topic) {
    return this.meetups.find(x => x.topic === topic);
  }

  getAllMeetup() {
    return this.meetups;
  }

  getSingleMeetup(id) {
    return this.meetups.find(x => x.id === id);
  }

  // eslint-disable-next-line consistent-return
  getUpcoming() {
    const today = new Date();
    const upcomingMeetups = [];
    for (const meetup of this.meetups) {
      if (new Date(meetup.happeningOn) > today) {
        upcomingMeetups.push(meetup);
      }
      return this.upcomingMeetups;
    }
  }

  deleteMeetup(id) {
    const meetup = this.getSingleMeetup(id);
    const index = this.meetups.indexOf(meetup);
    this.meetups.splice(index, 1);
    return {};
  }

  rsvp(id, data) {
    const meetup = this.getSingle(id);
    const index = this.meetups.indexOf(meetup);
    const meetupId = this.meetups[index].id;
    const meetuptopic = this.meetups[index].topic;
    const newRsvp = {
      meetup: meetupId,
      topic: meetuptopic,
      status: data.status,
    };
    this.meetups.push(newRsvp);
    return newRsvp;
  }
}

export default new Meetup();
