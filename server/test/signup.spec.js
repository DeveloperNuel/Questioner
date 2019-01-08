import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import uuid from 'uuid';
import app from '../app';

chai.use(chaiHttp);

// test for post sign-up
describe('POST /auth/sign-up', () => {
  const user = {
    id: uuid,
    email: 'test@gmail.com',
    username: 'test',
    password: 'test',
    registered: Date.now(),
  };
  it('should respond with status code 201', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign-up')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ status: 201, data: [user] });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should respond with 409 and message user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign-up')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .expect((res) => {
        expect(res.body).toEqual({ status: 409, error: 'user already exists' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
