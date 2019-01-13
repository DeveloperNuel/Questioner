import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import uuid from 'uuid/v4';
import app from '../app';

chai.use(chaiHttp);

// test for post sign-up
describe('POST /auth/sign-up', () => {
  const user = {
    id: uuid(),
    email: 'test@gmail.com',
    username: 'test',
    password: 'test',
    registered: Date.now(),
  };
  it('should respond with status code 201', () => {
    chai.request(app)
      .post('/api/v1/auth/sign-up')
      .send(user)
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status').eql(201);
        expect(res.body).to.be.an('object');
      });
  });
  it('should respond with 409 and message user already exists', () => {
    chai.request(app)
      .post('/api/v1/auth/sign-up')
      .send(user)
      .then((res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
});
