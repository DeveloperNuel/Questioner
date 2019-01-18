/* eslint-disable consistent-return */
import Joi from 'joi';
import questions from '../models/meetup';
import validate from '../middlewares/validation';

class QuestionController {
  static createQuestion(req, res) {
    // eslint-disable-next-line max-len
    const {
      createdBy, meetup, title, body,
    } = req.body;

    const { error } = Joi.validate({
      createdBy, meetup, title, body,
    }, validate.questionSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const question = questions.createQwest(req.body);
      return res.status(201).json({
        message: 'Your Question Posted Successful',
        question,
      });
    }
  }

  static getSingleQuestion(req, res) {
    const singleQuestion = questions.getSingleMeetup(req.params.id);
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
    const question = questions.findQuest(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: 'No question with the specified id',
      });
    }

    const like = questions.upVote(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      message: 'Successful',
      question: like,
    });
  }

  static downvote(req, res) {
    const question = questions.findQuest(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: 'No question with the specified id',
      });
    }

    const dislike = questions.downVote(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      message: 'Successful',
      question: dislike,
    });
  }
}

export default QuestionController;
