import isEmpty from 'lodash.isempty';
import validate from 'validate.js';

export default class Middleware {
  static createQuestionValidator(req, res, next) {
    const { meetup, title, body } = req.body;
    const error = {};

    if (!validate.isInteger(meetup)) {
      error.meetup = 'Meetup id must be an integer';
    }

    if (!meetup) {
      error.meetup = 'Meetup id is required';
    }

    if (!title || (title && validate.isEmpty(title))) {
      error.title = 'title is required';
    }

    if (title && (!validate.isString(title))) {
      error.title = 'title must be a string';
    }

    if (!body || (body && validate.isEmpty(body))) {
      error.body = 'question body is required';
    }

    if (body && !validate.isString(body)) {
      error.body = 'question body must be a string';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static createMeetupValidator(req, res, next) {
    const { topic, location, happeningOn } = req.body;
    const error = {};
    if (!topic || (topic && validate.isEmpty(topic))) {
      error.topic = 'topic is required';
    }

    if (topic && !validate.isString(topic)) {
      error.topic = 'topic must be a string';
    }

    if (!location || (location && validate.isEmpty(location))) {
      error.location = 'location is required';
    }

    if (location && !validate.isString(location)) {
      error.location = 'location must be a string';
    }

    if (!happeningOn || (happeningOn && validate.isEmpty(happeningOn))) {
      error.happeningOn = 'meetup date is required';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static validateRsvp(req, res, next) {
    const { response } = req.body;
    if (!response || (response && validate.isEmpty(response))) {
      return res.status(400).send({
        status: 400,
        error: 'response is required',
      });
    }

    if (response && !validate.isString(response)) {
      return res.status(400).send({
        status: 400,
        error: 'response must be a string',
      });
    }

    if (response.toLowerCase() === 'yes' || response.toLowerCase() === 'no'
      || response.toLowerCase() === 'maybe') {
      return next();
    }
    return res.status(400).send({
      status: 400,
      error: 'response must be either yes, no or maybe',
    });
  }
}
