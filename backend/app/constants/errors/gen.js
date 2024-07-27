'use strict';

const { v4: uuid } = require('uuid');

class MainClass extends Error {
  constructor(message = 'Something Went to Wrong', status = 400, count = '') {
    super(message);
    this.uid = uuid();
  }
}
const InvalidUserError = new MainClass('User Not Found Credentials', 400);
const InvalidCredentialsError = new MainClass('Invalid Password', 402);
const EmailNotVerifiedError = new MainClass('Email Not Found', 401);
const InvalidRecipeError = new MainClass('Recipe Not Found Credentials', 400);


module.exports = {
  InvalidUserError,
  InvalidCredentialsError,
  EmailNotVerifiedError,
  InvalidRecipeError,
};
