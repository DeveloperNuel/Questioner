import Meetup from '../models/meetup';
import validation from '../middlewares/validation';

class MeetupController {
  // eslint-disable-next-line consistent-return
  static createMeetup(req, res) {
    // eslint-disable-next-line max-len
    const {
      location, topic, images, tags, happeningOn,
    } = req.body;

    const { error } = validation({
      location, topic, images, tags, happeningOn,
    });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const findTitle = Meetup.getTitle(req.body.topic);
      if (findTitle) {
        return res.status(400).json({
          status: 400,
          error: 'Duplicate Meetup',
        });
      }
      const meetup = Meetup.createMeetup(req.body);
      return res.status(201).json({
        status: 201,
        data: meetup,
      });
    }
  }

  static getAllMeetup(req, res) {
    const meetup = Meetup.getAllMeetup();
    if (meetup.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Meetups not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: ' All Meetups ',
      meetup: Meetup,
    });
  }

  static getSingle(req, res) {
    const singleMeetup = Meetup.getSingleMeetup(req.params.id);
    if (!singleMeetup) {
      return res.status(404).json({
        status: 404,
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      status: 200,
      meetup: singleMeetup,
    });
  }

  static getUpcoming(req, res) {
    const upcoming = Meetup.upcomingMeetups();
    if (upcoming.length === 0 || upcoming === 'undefined') {
      return res.status(404).json({
        status: 404,
        message: 'No upcoming meetup found',
      });
    }
    return res.status(200).json({
      message: 'Upcoming meetups',
      meetups: upcoming,
    });
  }

  static deleteMeetup(req, res) {
    const meetup = Meetup.getSingleMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        message: 'No meetup found',
      });
    }
    const del = Meetup.deleteMeetup(req.params.id);
    return res.status(200).json({
      message: 'Meetup deleted',
      meetup: del,

    });
  }

  static respond(req, res) {
    const meetup = Meetup.getSingleMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        message: 'Meetup does not exist',
      });
    }
    const response = Meetup.rsvp(req.params.id, req.body);
    return res.status(201).json({
      message: 'Response sent',
      response,
    });
  }
}


export default MeetupController;
