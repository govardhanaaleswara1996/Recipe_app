'use strict';

const Joi = require('joi').extend(require('@joi/date'));
const { roles } = require('../constants/roles');

const registerOnsiteUser = Joi.object().keys({
  userName: Joi.string().regex(/^[ A-Za-z0-9_@./#&+-]*$/).min(8).max(50)
    .required()
    .messages({
      'string.pattern.base': 'Username should be alphabetic',
    }),
  email: Joi.string().email().required(),
  dialCode: Joi.string().min(2).max(4).required(),
  mobile: Joi.string().length(10).pattern(/^\d+$/).required()
    .messages({
      'string.pattern.base': 'Enter valid mobile number',
    }),
  role: Joi.string().valid(...roles).required(),
  providerNPI: Joi.string().length(10).pattern(/^\d+$/).optional()
    .messages({
      'string.pattern.base': 'ProviderNPI should be valid',
    }),
  physicianId: Joi.string().regex(/^[ A-Za-z0-9]*$/).min(8)
    .max(64)
    .optional()
    .messages({
      'string.pattern.base': 'physicianId should be alphanumeric',
    }),
  firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24)
    .messages({
      'string.pattern.base': 'Firstname should be alphabetic',
    }),
  lastName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24)
    .messages({
      'string.pattern.base': 'Lastname should be alphabetic',
    }),
  location: Joi.array().required(),
  orgName: Joi.string().optional(),
  profile: Joi.string().optional(),
  otp: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  deviceAssignment: Joi.array().required(),
  startDate: Joi.date().required()
    .format('YYYY-MM-DD')
    .messages({
      'date.format': 'startDate should be a valid date',
    }),
  status: Joi.string().optional(),
  inactivityDate: Joi.date().optional(),
  speciality: Joi.string().optional(),
  specialityId: Joi.string().optional(),
});

const sendOtp = Joi.object().keys({
  email: Joi.string().email().required(),
});

const verifyOtp = Joi.object().keys({
  userId: Joi.string().required(),
  otp: Joi.string().required(),
  login: Joi.boolean().optional(),
  deviceToken: Joi.string().optional(),

});

const resetPassword = Joi.object().keys({
  userId: Joi.string().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,24}$/).min(8).max(24)
    .optional()
    .messages({
      'string.pattern.base': 'Password must match atleast one camelcase, number, symbol',
    }),
  isMail: Joi.boolean().optional(),
  isForgot: Joi.boolean().optional(),
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

const getSettings = Joi.object().keys({
  userId: Joi.string().required()
    .messages({
      'string.empty': 'userId cannot be empty',
    }),
});

const userSearch = Joi.object().keys({
  searchValue: Joi.string().required()
    .messages({
      'string.empty': 'searchName must not be empty',
    }),
});

const updateUser = Joi.object().keys({
  providerId: Joi.string().required(),
  dialCode: Joi.string().min(2).max(4).optional(),
  firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24).optional()
    .messages({
      'string.pattern.base': 'Firstname should be alphabetic',
    }),
  lastName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24).optional()
    .messages({
      'string.pattern.base': 'Lastname should be alphabetic',
    }),
  location: Joi.array().optional(),
  orgName: Joi.string().optional(),
  profile: Joi.string().optional(),
  otp: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  deviceAssignment: Joi.array().optional(),
  startDate: Joi.date().optional()
    .format('YYYY-MM-DD')
    .messages({
      'date.format': 'startDate should be a valid date',
    }),
  status: Joi.string().optional(),
  inactivityDate: Joi.date().optional(),
  email: Joi.string().email().optional(),
  mobile: Joi.string().length(10).pattern(/^\d+$/).optional()
    .messages({
      'string.pattern.base': 'Enter valid mobile number',
    }),
  providerNPI: Joi.string().length(10).pattern(/^\d+$/).optional()
    .messages({
      'string.pattern.base': 'ProviderNPI should be valid',
    }),
  physicianId: Joi.string().regex(/^[ A-Za-z0-9]*$/).min(8)
    .max(64)
    .optional()
    .messages({
      'string.pattern.base': 'physicianId should be alphanumeric',
    }),
  speciality: Joi.string().optional(),
  specialityId: Joi.string().optional(),
  MFAFlag: Joi.boolean().optional(),
});

const getAppSettings = Joi.object().keys({
  userId: Joi.string().required()
    .messages({
      'string.empty': 'userId cannot be empty',
    }),
});

const createAppSettings = Joi.object().keys({
  jwtLifeTime: Joi.number().optional(),
  jwtRefreshLifeTime: Joi.number().optional(),
  inactiveTimeout: Joi.array().optional(),
  logoutTimeout: Joi.array().optional(),
  supportMailId: Joi.string().email().optional(),
  auditor: Joi.string().optional(),
});

const updateAppSettings = Joi.object().keys({
  userId: Joi.string().required()
    .messages({
      'string.empty': 'userId cannot be empty',
    }),
  jwtLifeTime: Joi.number().optional(),
  jwtRefreshLifeTime: Joi.number().optional(),
  inactiveTimeout: Joi.array().optional(),
  logoutTimeout: Joi.array().optional(),
  supportMailId: Joi.string().email().optional(),
  auditor: Joi.string().optional(),
});

const updateSettings = Joi.object().keys({
  userId: Joi.string().required()
    .messages({
      'string.empty': 'userId cannot be empty',
    }),
  confirmDeleteCounter: Joi.boolean().optional(),
  confirmEndEncounter: Joi.boolean().optional(),
  beepForRecording: Joi.boolean().optional(),
  inactivityTimeout: Joi.number().optional(),
  networkWifiOnly: Joi.boolean().optional(),
  logoutTimeout: Joi.number().optional(),
});

const status = Joi.object().keys({
  userId: Joi.string().required()
    .messages({
      'string.empty': 'userId cannot be empty',
    }),
  status: Joi.string().pattern(/^[0-3]+$/).required()
    .messages({
      'string.pattern.base': 'Status should be valid',
    }),
  inactivityDate: Joi.date().optional()
    .format('YYYY-MM-DD')
    .messages({
      'date.format': 'inactivityDate should be a valid date',
    }),
  MFAFlag: Joi.boolean().optional(),
  MFARemoveFlag: Joi.boolean().optional(),
});

module.exports = {
  registerOnsiteUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  pagination,
  getSettings,
  userSearch,
  updateUser,
  getAppSettings,
  createAppSettings,
  updateAppSettings,
  updateSettings,
  status,
};
