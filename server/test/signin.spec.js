
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Questioner Server', () => {
// Post user sign-in
  describe('POST /auth/sign-in', () => {
    it('should respond with status code 200', () => {
      chai.request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: 'egentle05@gmail.com',
          password: 'emma',
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
        });
    });
    it('should respond with 401 and message authentication failed', () => {
      chai.request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: 'egentle05@gmail.com',
          password: 'work',
        })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.be.an('object');
        });
    });
  });
});
