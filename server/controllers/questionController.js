import uuid from 'uuid/v4';
import questions from '../models/meetup';

class QuestionController {
  static createQuestion(req, res) {
    const newQuestion = {
      id: uuid(),
      createdOn: new Date(),
      createdBy: 2,
      meetup: 2,
      title: req.body.title,
      body: req.body.body,
      vote: 0,
    };
    if (newQuestion.title && newQuestion.body) {
      questions.push(newQuestion);
      return res.status(201).send({
        status: 201,
        data: [newQuestion],
      });
    }
    return res.status(400).send({ error: 'Question not created' });
  }

  static upVote(req, res) {
    const question = questions.find(x => x.id === parseInt(req.params.id, 10));
    if (question) {
      question.votes += 1;
      return res.status(200).send({
        status: 200,
        data: [question],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }

  static downVote(req, res) {
    const question = questions.find(x => x.id === parseInt(req.params.id, 10));
    if (question) {
      question.votes -= 1;
      return res.status(200).send({
        status: 200,
        data: [question],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }
}

export default QuestionController;
