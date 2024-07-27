'use strict';

const Joi = require('joi');

const addComments = Joi.object().keys({
  taskId: Joi.string().required(),
  text: Joi.string().trim().required()
    .messages({
      'string.empty': 'Text is not allowed to be empty',
      'string.trim': 'Text is not allowed to be empty',
    }),
});

const getComments = Joi.object().keys({
  taskId: Joi.string().required(),
});

const getCommentBody = Joi.object().keys({
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});

const replyComments = Joi.object().keys({
  taskId: Joi.string().required(),
  commentId: Joi.string().required(),
  text: Joi.string().trim().required()
    .messages({
      'string.empty': 'Text is not allowed to be empty',
      'string.trim': 'Text is not allowed to be empty',
    }),
});

const editReplyComments = Joi.object().keys({
  taskId: Joi.string().required(),
  replyId: Joi.string().required(),
  text: Joi.string().trim().required()
    .messages({
      'string.empty': 'Text is not allowed to be empty',
      'string.trim': 'Text is not allowed to be empty',
    }),
});
module.exports = {
  addComments,
  getComments,
  replyComments,
  editReplyComments,
  getCommentBody,

};
