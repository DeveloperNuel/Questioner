import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import uuid from 'uuid/v4';
import app from '../app';

chai.use(chaiHttp);


// Testing for Questioner Server
describe('Questioner Server', () => {
  // test create a meetup
  describe('POST /meetups', () => {
    const testData = {
      id: uuid(),
      topic: 'Progate Rwanda Meetup',
      location: 'Kigali',
      happeningOn: '01/02/2019',
      images: 'www.images.com',
      tags: ['Dev', 'Software'],
    };

    it('should respond with status code 201 created', () => {
      chai.request(app)
        .post('/api/v1/meetups')
        .send(testData)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').eql(201);
          expect(res.body).to.be.an('object');
        });
    });
    it('should respond with status code 400 not created', () => {
      testData.id = undefined;
      chai.request(app)
        .post('/api/v1/meetups')
        .send(testData)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
  // test to get all meetups
  describe('GET /meetups', () => {
    it('should respond with 200 and all meetups', () => {
      chai.request(app)
        .get('/api/v1/meetups')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
  });
  // test for get single meetup by id
  describe('GET /meetups/:id', () => {
    it('should respond with 200 and single meetup', () => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
    it('should respond with 404 and message meetup not found', () => {
      chai.request(app)
        .get('/api/v1/meetups/4')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });

  // test for post meetup/:id/rsvp
  describe('POST /meetups/:id/rsvps', () => {
    const acceptedData = {
      response: 'yes' || 'no' || 'maybe',
    };
    const nonAcceptedData = {
      response: '' || 'YES' || 'Maybe',
    };
    it('should respond with status code 201', () => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
        .send(acceptedData)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').eql(201);
          expect(res.body).to.be.an('object');
        });
    });
    it('should respond with status code 400 not created', () => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
        .send(nonAcceptedData)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
    it('should respond with 404 and message meetup not found', () => {
      chai.request(app)
        .post('/api/v1/meetups/4/rsvps')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
  // Get Meetups Question
  describe('POST /meetups/:id/questions', () => {
    it('It should get all meetup questions', () => {
      chai.request(app)
        .get('/api/v1/meetups/3/questions')
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').eql(201);
          expect(res.body).to.be.an('object');
        });
    });
  });

  // Get Upcoming
  describe('GET /meetups/upcoming', () => {
    it('It should get Upcoming meetup meetups', () => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .then((res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body).to.be.an('object');
        });
    });
  });

  // Delete meetup
  describe('DELETE /meetups/:id', () => {
    const testData = {
      id: uuid(),
      topic: 'Progate Rwanda Meetup',
      location: 'Kigali',
      happeningOn: '01/02/2019',
      images: 'www.images.com',
      tags: ['Dev', 'Software'],
    };
    it('should delete a specific meetup', () => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .send(testData)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Meetup Deleted');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
    it('should respond with 404 and message meetup not found', () => {
      chai.request(app)
        .post('/api/v1/meetups/4')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
});
