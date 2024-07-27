'use strict';

const Joi = require('joi');

const pagination = Joi.object().keys({
  pageSize: Joi.number().integer().min(1).required()
    .messages({
      'number.min': 'Invalid pageSize',
      'number.integer': 'Invalid pageSize',
    }),
  pageNumber: Joi.number().integer().min(1).required()
    .messages({
      'number.integer': 'Invalid pageNumber',
      'number.min': 'Invalid pageNumber',
    }),
});
const workloadPagination = Joi.object().keys({
  pageSize: Joi.number().integer().min(1).required()
    .messages({
      'number.min': 'Invalid pageSize',
      'number.integer': 'Invalid pageSize',
    }),
  pageNumber: Joi.number().integer().min(1).required()
    .messages({
      'number.integer': 'Invalid pageNumber',
      'number.min': 'Invalid pageNumber',
    }),
  date: Joi.date().required(),
});
module.exports = {
  pagination,
  workloadPagination,
};
