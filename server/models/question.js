import uuid from 'uuid/v4';
import users from './user';

class Questions {
  constructor() {
    this.questions = [];
  }

  createQuest(data, meetupId) {
    const newQuestion = {
      id: uuid(),
      createdOn: new Date(),
      createdBy: 2,
      meetup: meetupId,
      title: data.topic,
      body: data.body,
      upVote: {
        users: [],
        votes: 0,
      },
      downVote: {
        users: [],
        votes: 0,
      },
    };
    this.questions.push(newQuestion);
    return newQuestion;
  }

  singleQuestion(id) {
    return this.questions.find(x => x.id === id);
  }

  upVote(id, userId) {
    const currentUser = users.find(x => x.id === userId);
    if (!currentUser) {
      return 'User Does not exists';
    }
    const question = this.singleQuestion(id);
    if (question.upVote.users.includes(userId)) {
      return 'You have Arleady Upvoted';
    }
    if (question.downVote.users.includes(userId)) {
      question.upVote.votes += 1;
      question.upVote.users.push(userId);
      question.downVote.users.filter(user => user !== userId);
      question.downVote.votes -= 1;
    } else {
      question.upVote.votes += 1;
      question.upVote.users.push(userId);
    }
    return question;
  }

  downVote(id, userId) {
    const currentUser = users.find(x => x.id === userId);
   
    if (!currentUser) {
      return 'User Does not exists';
    }
    const question = this.singleQuestion(id);
    if (question.upVote.users.includes(userId)) {
      return 'You have Arleady Downvoted';
    }
    if (question.downVote.users.includes(userId)) {
      question.downVote.votes += 1;
      question.downVote.users.push(userId);
      question.upVote.users.filter(user => user !== userId);
      question.upVote.votes -= 1;
    } else {
      question.downVote.votes += 1;
      question.downVote.users.push(userId);
    }
    return question;
  }
}

export default new Questions();
