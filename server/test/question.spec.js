import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import uuid from 'uuid/v4';
import meetups from '../models/meetup';
import users from '../models/user';
import app from '../app';

chai.use(chaiHttp);

// test for create a question
describe('POST /meetups/:id/questions', () => {
  const testData = {
    id: uuid(),
    createdOn: new Date(),
    createdBy: users.id,
    meetup: meetups.id,
    topic: 'How Do I Become the first in Class',
    body: 'You have to study very hard and collaborate with other classmate',
    votes: 0,
  };
  it('should respond with status code 201 created', () => {
    chai.request(app)
      .post('/api/v1/meetups/:id/questions')
      .send(testData)
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status').eql(201);
        expect(res.body).to.be.an('object');
      });
  });

  it('should respond with status code 400 question not created', () => {
    chai.request(app)
      .post('/api/v1/questions')
      .send(testData)
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });

  // test for patch question:id/upvote
  describe('PATCH /questions/:id/upvote', () => {
    it('should respond with 204', () => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .then((res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.have.property('status').eql(204);
          expect(res.body).to.be.an('object');
        });
    });
    it('should respond with 404 and message question not found', () => {
      chai.request(app)
        .patch('/api/v1/questions/4/upvote')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });

  // test for patch question:id/downvote
  describe('PATCH /questions/:id/downvote', () => {
    it('should respond with status code 200', () => {
      chai.request(app)
        .patch('/api/v1/questions/1/downvote')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body).to.be.an('object');
        });
    });
    it('should respond with 404 and message question not found', () => {
      chai.request(app)
        .patch('/api/v1/questions/4/downvote')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
  // test get question by Id
  describe('GET /questions/:id', () => {
    it('should respond with 200 and single question', () => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
    it('should respond with 404 and message question not found', () => {
      chai.request(app)
        .get('/api/v1/questions/4')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
});
