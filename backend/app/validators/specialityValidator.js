'use strict';

const Joi = require('joi');

const createSpeciality = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().optional(),
  removed: Joi.string().optional(),
});
const updateSpeciality = Joi.object({
  specialityId: Joi.string().required(),
});

module.exports = {
  createSpeciality,
  updateSpeciality,
};
