'use strict';

const Joi = require('joi');

const createSubject = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().optional(),
  desc: Joi.date().optional(),
  removed: Joi.string().optional(),
});
const updateSubject = Joi.object({
  subjectId: Joi.string().required(),
});

module.exports = {
  createSubject,
  updateSubject,
};
