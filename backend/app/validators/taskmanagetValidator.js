'use strict';

const Joi = require('joi');

const createTask = Joi.object({
  taskName: Joi.string().trim().required()
    .messages({
      'string.empty': 'Task Name should not be empty',
      'string.trim': 'Task Name should not be empty',
    }),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  auditorId: Joi.string().required(),
  orgTid: Joi.number().required()
    .messages({
      'number.empty': 'Org.TIN should not be empty',
      'number.base': 'Org.TIN should be a number',
    }),
  providerId: Joi.string().required(),
  speciality: Joi.string().required(),
  scheduleId: Joi.string().required(),
  location: Joi.string().required(),
  type: Joi.string().required(),
  appointmentId: Joi.string().required(),
  patientName: Joi.string().required(),
  patientAccount: Joi.string().required(),
  patientdob: Joi.string().required(),
  patientGender: Joi.string().required(),
  mrn: Joi.string().required(),
  // encounterId: Joi.array().optional(),
  encounter: Joi.array().optional(),
  // claimSubmittedTime: Joi.date().empty().optional(),
  // inTime: Joi.date().empty().optional(),
  // grabTime: Joi.date().empty().optional(),
  // timeInProd: Joi.date().empty().optional(),
  // finishTime: Joi.date().empty().optional(),
  // timeToChart: Joi.date().empty().optional(),
  // timeToClaim: Joi.date().empty().optional(),
  status: Joi.string().empty().required(),
  createdBy: Joi.string().empty().optional(),
  updatedBy: Joi.string().empty().optional(),
  // encounterId: Joi.string().optional(),
  // audio: Joi.string().optional(),
  // commentId: Joi.string().empty().optional(),
  comment: Joi.string().empty('').optional(),
  encounterUniqID: Joi.string().empty('').optional(),
});

const IdCheck = Joi.object({
  id: Joi.string().required(),
});

const updatedTask = Joi.object({
  id: Joi.string().required(),
  // _id: Joi.string().optional().empty(''),
  // comment: Joi.alternatives().try(
  //   Joi.number().empty(null).empty({}).empty('')
  //     .optional(),
  //   Joi.object().empty(null).empty({}).empty('')
  //     .optional(),
  //   Joi.string().empty(null).empty('').empty({})
  //     .optional(),
  // ),
  // encounter: Joi.array().optional().empty().allow(null),
  taskName: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  auditorId: Joi.string().optional(),
  orgTid: Joi.number().optional().messages({
    'number.empty': 'Org.TIN should not be empty',
    'number.integer': 'Org.TIN should be a number',
  }),
  providerId: Joi.string().optional(),
  speciality: Joi.string().optional(),
  scheduleId: Joi.string().optional(),
  location: Joi.string().optional(),
  type: Joi.string().optional(),
  appointmentId: Joi.string().optional(),
  createdBy: Joi.string().optional(),
  createdAt: Joi.date().optional().empty().allow(null),
  patientName: Joi.string().optional(),
  providerName: Joi.string().optional(),
  auditorName: Joi.string().optional(),
  patientAccount: Joi.string().optional(),
  patientdob: Joi.string().optional(),
  patientGender: Joi.string().optional(),
  mrn: Joi.string().optional(),
  status: Joi.string().optional(),
  claimSubmittedTime: Joi.date().optional(),
  inTime: Joi.date().optional(),
  grabTime: Joi.date().optional(),
  timeInProd: Joi.date().optional(),
  finishTime: Joi.date().optional(),
  timeToChart: Joi.date().optional(),
  timeToClaim: Joi.date().optional(),
  transferdFromAuditorId: Joi.string().optional(),
  lastComment: Joi.string().optional(),
  encounterId: Joi.date().optional().empty().allow(null),
});

const StatusCheck = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});

const StatusUpdate = Joi.object({
  status: Joi.string().valid('not received', 'claim submitted', 'in progress', ' to do', 'transcribed', 'received', 'review').required(),
  id: Joi.string().optional(),
});

const providerId = Joi.object({
  providerId: Joi.string().required(),
});

const getPatientCheck = Joi.object({
  providerId: Joi.string().required(),
  appointmentDate: Joi.date().optional(),
});

const encounterCheck = Joi.object({
  providerId: Joi.string().required(),
  scheduleId: Joi.string().required(),
});

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
const paginationbyFilter = Joi.object().keys({
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
  status: Joi.array().empty().allow('').optional(),
  auditorId: Joi.string().empty().allow('').optional(),
});

const reassignTaskCheck = Joi.object({
  id: Joi.string().required(),
  auditorId: Joi.string().required(),
});
module.exports = {
  createTask,
  IdCheck,
  providerId,
  encounterCheck,
  pagination,
  StatusCheck,
  reassignTaskCheck,
  paginationbyFilter,
  updatedTask,
  StatusUpdate,
  getPatientCheck,
};
