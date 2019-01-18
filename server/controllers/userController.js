import uuid from 'uuid/v4';
import User from '../models/user';


class UserController {
  static createUser(req, res) {
    const registered = new Date();
    const {
      firstname, lastname, email, phoneNumber, username, password,
    } = req.body;
    const newUser = {
      id: uuid(),
      firstname,
      lastname,
      email,
      phoneNumber,
      username,
      password,
      registered,
    };
    const userFound = User.find(x => x.email.toString() === email);
    if (userFound) {
      return res.status(409).send({
        status: 409,
        error: 'User already exists',
      });
    }
    User.push(newUser);
    return res.status(201).send({
      status: 201,
      data: [newUser],
    });
  }

  static signIn(req, res) {
    const { email, password } = req.body;

    const userFound = User.find(
      user => (User.email === email || User.username === email) && (user.password === password),
    );
    if (userFound) {
      return res.status(200).send({
        status: 200,
        message: 'Login was successfull',
      });
    }
    return res.status(401).send({
      status: 401,
      error: 'Sign In failed',
    });
  }
}

export default UserController;
