'use strict';

const Joi = require('joi');

const getMessageById = Joi.object({
  subjectId: Joi.string().required(),
  users: Joi.array().required(),
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});

const modifyUser = Joi.object({
  threadId: Joi.string().required(),
  remove: Joi.boolean().required(),
  users: Joi.array().required(),
  include: Joi.boolean().required(),
});

const getAllMessage = Joi.object({
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});

const readUsers = Joi.object({
  userId: Joi.string().required(),
  messageId: Joi.array().required(),
});

const userList = Joi.object({
  roles: Joi.array().required(),
});
const searchMessage = Joi.object({
  searchValue: Joi.string().regex(/^[a-zA-Z0-9, ]*$/).required()
    .messages({
      'string.pattern.base': 'search result not found',
    }),
});

module.exports = {
  getMessageById,
  modifyUser,
  getAllMessage,
  readUsers,
  searchMessage,
  userList,
};
