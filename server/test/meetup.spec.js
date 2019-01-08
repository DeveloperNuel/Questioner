import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import uuid from 'uuid/v4';
import meetups from '../models/meetup';
import users from '../models/user';
import app from '../app';

chai.use(chaiHttp);


// Testing for Questioner Server
describe('Questioner Server', () => {
  // test create a meetup
  describe('POST /meetup', () => {
    const testData = {
      id: uuid(),
      title: 'Progate Rwanda Meetup',
      location: 'Kigali',
      happeningOn: '01/02/2019',
      images: 'www.images.com',
      tags: ['Dev', 'Software'],
    };

    it('should respond with status code 201 created', () => {
      chai.request(app)
        .post('/api/v1/meetup')
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
        .post('/api/v1/meetup')
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
        .get('/api/v1/meetup')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
  });
  // test for get single meetup by id
  describe('GET /meetup/:id', () => {
    it('should respond with 200 and single meetup', () => {
      chai.request(app)
        .get('/api/v1/meetup/1')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
    it('should respond with 404 and message meetup not found', () => {
      chai.request(app)
        .get('/api/v1/meetup/4')
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
  // test create a question
  describe('POST /questions', () => {
    const testData = {
      id: uuid(),
      createdOn: new Date(),
      createdBy: users[0].id,
      meetup: meetups[0].id,
      title: 'How Do I Become the first in Class',
      body: 'You have to study very hard and collaborate with other classmate',
      votes: 0,
    };
    it('should respond with status code 201 created', () => {
      chai.request(app)
        .post('/api/v1/questions')
        .send(testData)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('status').eql(201);
          expect(res.body).to.be.an('object');
        });
    });

    it('should respond with status code 400 question not created', (done) => {
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
    describe('PATCH /question/:id/upvote', () => {
      it('should respond with 204', (done) => {
        chai.request(app)
          .patch('/api/v1/questions/1/upvote')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should respond with 404 and message question not found', (done) => {
        chai.request(app)
          .patch('/api/v1/questions/4/upvote')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect((res) => {
            expect(res.body).toEqual({ status: 404, error: 'question not found' });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    // test for patch question:id/downvote
    describe('PATCH /question/:id/downvote', () => {
      it('should respond with status code 200', (done) => {
        chai.request(app)
          .patch('/api/v1/questions/1/downvote')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should respond with 404 and message question not found', (done) => {
        chai.request(app)
          .patch('/api/v1/questions/4/downvote')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect((res) => {
            expect(res.body).toEqual({ status: 404, error: 'question not found' });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
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
      it('should respond with status code 201', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(acceptedData)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should respond with status code 400 not created', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send(nonAcceptedData)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should respond with 404 and message meetup not found', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/4/rsvps')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect((res) => {
            expect(res.body).toEqual({ status: 404, error: 'meetup not found' });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
    });

 // test get question by Id
   describe('GET /question/:id', () => {
     it('should respond with 200 and single question', (done) => {
     chai.request(app)
         .get('/api/v1/questions/1')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .end((err) => {
           if (err) return done(err);
           return done();
         });
     });
     it('should respond with 404 and message question not found', (done) => {
       chai.request(app)
         .get('/api/v1/questions/4')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(404)
         .expect((res) => {
           expect(res.body).toEqual({ status: 404, error: 'question not found' });
         })
         .end((err) => {
           if (err) return done(err);
           return done();
         });
     });
  });
});