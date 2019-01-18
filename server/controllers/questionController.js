/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import Joi from 'joi';
import questions from '../models/question';
import Meetup from '../models/meetup';
import validate from '../middlewares/validation';

class QuestionController {
  static createQuestion(req, res) {
    // eslint-disable-next-line max-len
    const {
      createdby, meetup, title, body,
    } = req.body;
    const meetupId = req.params.id;

    const { error } = Joi.validate({
      createdby, meetup, title, body,
    }, validate.questionSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      let meetupExits = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const m of Meetup.meetups) {
        if (m.id === meetupId) {
          meetupExits = true;
          break;
        }
      }
      if (!meetupExits) {
        return res.status(404).json({
          status: 404,
          error: 'Meetup not found',
        });
      }
      const question = questions.createQuest(req.body, meetupId);
      return res.status(201).json({
        message: 'Your Question Posted Successful',
        question,
      });
    }
  }

  static getSingleQuestion(req, res) {
    const singleQuestion = questions.singleQuestion(req.params.id);
    if (!singleQuestion) {
      return res.status(404).json({
        status: 404,
        message: 'Question not found',
      });
    }
    return res.status(200).json({
      status: 200,
      meetup: singleQuestion,
    });
  }

  static upvote(req, res) {
    const question = questions.singleQuestion(req.params.id, Number.parseInt(req.body.createdby, 10));
    if (question === 'User Does not exists') {
      return res.status(404).json({
        status: 404,
        message: question,
      });
    }

    if (question === 'You have Arleady Upvoted') {
      return res.status(404).json({
        status: 404,
        message: question,
      });
    }


    const like = questions.upVote(req.params.id, Number.parseInt(req.body.createdby, 10));
    return res.status(200).json({
      status: 200,
      message: like,
    });
  }

  static downvote(req, res) {
    const question = questions.singleQuestion(req.params.id, parseInt(req.body.createdby, 10));
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: 'No question with the specified id',
      });
    }
    const dislike = questions.downVote(req.params.id, parseInt(req.body.createdby, 10));

    if (question === 'User Does not exists') {
      return res.status(404).json({
        status: 404,
        error: 'User does not exists',
      });
    }
    if (question === 'You have Arleady Upvoted') {
      return res.status(404).json({
        status: 404,
        error: question,
      });
    }
    return res.status(200).json({
      status: 200,
      question: dislike,
    });
  }
}

export default QuestionController;
