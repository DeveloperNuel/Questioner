
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Questioner Server', () => {
// Post user sign-in
  describe('POST /auth/sign-in', () => {
    it('should respond with status code 200', (done) => {
      chai.request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: 'egentle05@gmail.com',
          password: 'emma',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ status: 200, message: 'authenticated' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 401 and message authentication failed', (done) => {
      chai.request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: 'egentle05@gmail.com',
          password: 'work',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({ status: 401, error: 'authentication failed' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
