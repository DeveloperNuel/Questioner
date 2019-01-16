import Meetup from '../models/meetup';

const MeetupController = {
  createMeetup(req, res) {
    // eslint-disable-next-line max-len
    if (req.body.topic.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'All Fields required',
      });
    }
    const findTitle = Meetup.getTitle(req.body.topic);
    if (findTitle) {
      return res.status(400).json({
        status: 400,
        error: 'Duplicate Meetup',
      });
    }
    const meetup = Meetup.createMeetup(req.body);
    return res.status(201).json({
      data: meetup,
    });
  },
  getAllMeetup(req, res) {
    const meetup = Meetup.getAllMeetup();
    if (meetup.length === 0) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      message: ' All Meetups ',
      meetup: Meetup,
    });
  },
  getSingle(req, res) {
    const singleMeetup = Meetup.getSingleMeetup(req.params.id);
    if (!singleMeetup) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      meetup: singleMeetup,
    });
  },
  getUpcoming(req, res) {
    const upcoming = Meetup.upcomingMeetups();
    if (upcoming.length === 0 || upcoming === 'undefined') {
      return res.status(404).json({
        message: 'No upcoming meetup found',
      });
    }
    return res.status(200).json({
      message: 'Upcomming meetups',
      meetups: upcoming,
    });
  },
  deleteMeetup(req, res) {
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
  },
  respond(req, res) {
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
  },
};
export default MeetupController;
