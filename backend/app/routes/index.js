'use strict';

const errorHandlingMiddleware = require('../lib/error-handling-middleware');
const userRouter = require('./user');
const recipeRouter = require('./recipe');


module.exports = (app) => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/recipe', recipeRouter);
  app.use(errorHandlingMiddleware);
};
