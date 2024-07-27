'use strict';

const Joi = require('joi').extend(require('@joi/date'));

const currentdate = new Date();

const loginUser = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Please enter the password',
    }),
  reLogin: Joi.boolean().optional(),
  deviceToken: Joi.string().optional(),
  isAdminReauthenticate: Joi.boolean().optional(),

});
const searchUser = Joi.object().keys({
  searchName: Joi.string().required()
    .messages({
      'string.empty': 'searchName must not be empty',
    }),
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

const getUserActivity = Joi.object().keys({
  pageSize: Joi.number().integer().min(1).optional()
    .messages({
      'number.min': 'Invalid pageSize',
      'number.integer': 'Invalid pageSize',
    }),
  pageNumber: Joi.number().integer().min(1).optional()
    .messages({
      'number.integer': 'Invalid pageNumber',
      'number.min': 'Invalid pageNumber',
    }),
});

const updateUserActivity = Joi.object({
  activityLogs: Joi.array().items(Joi.object({
    userLoginAt: Joi.date().iso().optional(),
    userLogoutAt: Joi.date().iso().optional(),
    connectionLostAt: Joi.date().iso().optional(),
    inactivityTimeoutAt: Joi.date().iso().optional(),
    forceLogoutAt: Joi.date().iso().optional(),
    reAuthenticationAt: Joi.date().iso().optional(),
    forgotPassword: Joi.boolean().optional(),
    ipadUDID: Joi.string().optional(),
    online: Joi.boolean().optional(),
  })),
});

const refresh = Joi.object().keys({
  userId: Joi.string().required(),
  refreshToken: Joi.string().required(),
});

const setProvider = Joi.object().keys({
  encounterId: Joi.string().required(),
  providerId: Joi.string().required(),
  appointmentId: Joi.string().required(),
  encounterTime: Joi.object().required(),
});

const getProvider = Joi.object().keys({
  providerId: Joi.string().required(),
});

const updateProvider = Joi.object().keys({
  id: Joi.string().required(),
  providerId: Joi.string().optional(),
  appointmentId: Joi.string().optional(),
  encounterTime: Joi.object().optional(),
});

const updateEncounter = Joi.object().keys({
  appointmentId: Joi.string().required(),
});

module.exports = {
  loginUser,
  searchUser,
  pagination,
  getUserActivity,
  updateUserActivity,
  refresh,
  setProvider,
  getProvider,
  updateProvider,
  updateEncounter,
};
