import uuid from 'uuid/v4';
import { meetups } from '../models/meetup';


class MeetupController {
  static createMeetup(req, res) {
    const id = uuid();
    const createdOn = new Date();
    // const {
    //   title, location, happeningOn, images, tags,
    // } = req.body;
    const newMeetup = {
      id, createdOn, ...req.body,
    };

    const findTitle = meetups.find(x => x.title === newMeetup.title);
    console.log(findTitle);
    if (!findTitle && id !== undefined) {
      meetups.push(newMeetup);
      return res.status(201).send({
        status: 201,
        data: [newMeetup],
      });
    }
    return res.status(400).send({ status: 400, error: 'Meetup not created' });
  }

  static getAllMeetup(req, res) {
    if (meetups.length > 0) {
      return res.status(200).send({
        status: 200,
        data: meetups,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Meetups not found',
    });
  }

  static getSingle(req, res) {
    const { id } = req.params;
    const meetupFound = meetups.find(x => x.id.toString() === id);
    if (meetupFound) {
      return res.status(200).send({
        status: 200,
        data: [meetupFound],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Meetup not found',
    });
  }

  static getUpcoming(req, res) {
    const today = new Date();
    const upcomingMeetups = [];

    meetups.forEach((meetup) => {
      const happeningOnDate = new Date(meetup.happeningOn);
      if (happeningOnDate.getTime() > today) {
        upcomingMeetups.push(meetup);
      }
      return upcomingMeetups;
    });

    if (upcomingMeetups.length > 0) {
      return res.status(200).send({ status: 200, data: upcomingMeetups });
    }
    return res.status(404).send({ status: 404, error: 'No upcoming meetups' });
  }
}


export default MeetupController;
