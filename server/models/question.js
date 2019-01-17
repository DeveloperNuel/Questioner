import uuid from 'uuid/v4';

class Questions {
  constructor() {
    this.questions = [];
  }

  createQuest(data) {
    const newQuestion = {
      id: uuid(),
      createdOn: new Date(),
      createdBy: 2,
      meetup: 2,
      title: data.topic,
      body: data.body,
      upvote: 0,
      downvote: 0,
    };
    this.questions.push(newQuestion);
    return newQuestion;
  }

  singleQuestion(id) {
    return this.questions.find(x => x.id === id);
  }

  upVote(id) {
    const vote = this.singleQuestion(id);

    const index = this.questions.indexOf(vote);
    this.questions[index].upvote = vote.upvote + 1;

    return this.questions[index];
  }

  downVote(id) {
    const vote = this.singleQuestion(id);
    const index = this.questions.indexOf(vote);
    const myvote = this.questions[index].downvote;
    if (myvote > 0) {
      this.questions[index].votes = vote.downvote - 1;
      return this.questions[index];
    }
    return this.questions[index];
  }
}

export default new Questions();
