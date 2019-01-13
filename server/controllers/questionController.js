import uuid from 'uuid/v4';
import question from '../models/meetup';

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
      question.push(newQuestion);
      return res.status(201).send({
        status: 201,
        data: [newQuestion],
      });
    }
    return res.status(400).send({ error: 'Question not created' });
  }
}

export default QuestionController;
