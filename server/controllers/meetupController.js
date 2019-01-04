import uuid from 'uuid';
import Meetup from '../models/meetup';


class MeetupController {
  static createMeetup(req, res) {
    const id = uuid;
    const createdOn = Date.now();
    const {
      title, location, happeningOn, images, tags,
    } = req.body;
    const newMeetup = {
      id, createdOn, title, location, happeningOn, images, tags,
    };
    const findTitle = Meetup.find(x => x.title === newMeetup.title);
    if (!findTitle) {
      Meetup.push(newMeetup);
      return res.status(201).send({
        status: 201,
        data: [newMeetup],
      });
    }
    return res.status(400).send({ status: 400, error: 'Meetup not created' });
  }

  static getAllMeetup(req, res) {
    if (Meetup.length > 0) {
      return res.status(200).send({
        status: 200,
        data: Meetup,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Meetups not found',
    });
  }

  static getSingle(req, res) {
    const { id } = req.params;
    const meetupFound = Meetup.find(x => x.id.toString() === id);
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
}

export default MeetupController;
