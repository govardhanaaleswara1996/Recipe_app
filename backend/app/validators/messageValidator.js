'use strict';

const Joi = require('joi');

const getUsers = Joi.object({
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});
const getPatients = Joi.object({
  taskId: Joi.string().optional(),
  providerId: Joi.string().optional(),
  appointmentId: Joi.string().optional(),
  subjectId: Joi.string().optional(),
});

const searchUser = Joi.object({
  searchValue: Joi.string().required(),
});

const getMessageById = Joi.object({
  providerId: Joi.string().required(),
  subjectId: Joi.string().required(),
  appointmentId: Joi.string().required(),
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});

const modifyUser = Joi.object({
  users: Joi.array().required(),
  messageId: Joi.string().required(),
  remove: Joi.boolean().required(),
});

const getAllMessage = Joi.object({
  providerId: Joi.string().optional(),
  taskId: Joi.string().optional(),
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});

const getPatientDetails = Joi.object({
  providerId: Joi.string().optional(),
  taskId: Joi.string().optional(),
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
});

const readUsers = Joi.object({
  userId: Joi.string().required(),
  messageId: Joi.array().required(),
});

const exportChat = Joi.object({
  userId: Joi.string().required(),
  messageId: Joi.string().required(),
});

const getAttachment = Joi.object({
  providerId: Joi.string().required(),
  subjectId: Joi.string().required(),
  appointmentId: Joi.string().required(),
  pageSize: Joi.number().optional(),
  pageNumber: Joi.number().optional(),
  fileType: Joi.string().optional(),
  count: Joi.boolean().optional(),
});

const searchMessage = Joi.object({
  taskId: Joi.string().optional(),
  providerId: Joi.string().optional(),
  searchValue: Joi.string().regex(/^[a-zA-Z0-9, ]*$/).required()
    .messages({
      'string.pattern.base': 'search result not found',
    }),
});

const searchPatient = Joi.object({
  taskId: Joi.string().optional(),
  providerId: Joi.string().optional(),
  searchValue: Joi.string().required(),
});

module.exports = {
  getPatients,
  getUsers,
  searchUser,
  getMessageById,
  modifyUser,
  getAllMessage,
  getPatientDetails,
  readUsers,
  exportChat,
  getAttachment,
  searchMessage,
  searchPatient,
};
