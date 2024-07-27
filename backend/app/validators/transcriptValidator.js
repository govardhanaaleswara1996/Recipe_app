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
  appointmentId: Joi.string().empty().allow('').optional(),
  scheduleId: Joi.string().empty().allow('').optional(),
  encounterId: Joi.string().empty().allow('').optional(),
});

const createTranscript = Joi.object({
  scheduleId: Joi.string().required(),
  appointmentId: Joi.string().required(),
  encounterUniquID: Joi.string().required(),
  filePath_2A: Joi.string().required(),
  filePath_2B: Joi.string().required(),
  filePath_2C: Joi.string().optional(),
  filePathPDF_2A: Joi.string().optional(),
  filePathPDF_2B: Joi.string().optional(),
  filePathPDF_2C: Joi.string().optional(),
});

const chartNote = Joi.object({
  scheduleId: Joi.string().required(),
  appointmentId: Joi.string().required(),
  encounterUniquID: Joi.string().required(),
  filePath_D3: Joi.string().required(),
  filePath_ChartNote: Joi.string().required(),
  filePathPdf_D3: Joi.string().optional(),
  filePathPdf_ChartNote: Joi.string().optional(),
});

module.exports = {
  createTranscript,
  pagination,
  chartNote,
};
