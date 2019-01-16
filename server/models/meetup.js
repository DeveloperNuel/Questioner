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

  getUpcoming() {
    const today = new Date();
    const upcomingMeetups = [];
    Meetup.forEach((meetup) => {
      const happeningOnDate = new Date(meetup.happeningOn);
      if (happeningOnDate.getTime() > today) {
        upcomingMeetups.push(meetup);
      }
      return this.upcomingMeetups;
    });
  }

  deleteMeetup(id) {
    const meetup = this.getOneMeetup(id);
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
