/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

'use strict';

// eslint-disable-next-line no-unused-vars
const {
  PROVIDER, ONSITEADMIN, AUDITOR, AUDITORMANAGER, AUDITORADMIN,
} = require('../constants/roles');
async function errorHandlingMiddleware(error, req, res, next) {
  const errorCodeHandlers = (err) => {
    const validationErr = err.error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message.replace(/"/g, '');
      return prev;
    }, {});
    error.message = Object.values(validationErr).length ? Object.values(validationErr).join(', ') : 'Something Went Wrong';
    error.status = 422;
  };
  // Joi validation error
  if (error.error) {
    errorCodeHandlers(error);
  }
  if (error.name === 'ValidationError') {
    const keys = Object.keys(error.errors);
    const errorMessages = keys
      .map((key) => error.errors[key].message)
      .filter((message) => message)
      .toString();

    error.message = errorMessages;
    error.status = 400;
  }

  if (error.name === 'MongoError' && error.code === 11000) {
    error.status = 409;
  }

  if (error.name === 'TokenExpiredError') {
    const token = (req.headers.authorization || req.headers.Authorization || '')
      .split('Bearer ')
      .pop();    
  }
  const { status = 500, message = 'Something Went Wrong' } = error;
  res.status(status).json({ statusCode: status, message, status: false });
}

module.exports = errorHandlingMiddleware;
