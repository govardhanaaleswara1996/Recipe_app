'use strict';

const Joi = require('joi');
const { roles } = require('../constants/roles');

const registerUser = Joi.object().keys({
  userName: Joi.string().regex(/^[ A-Za-z0-9_@./#&+-]*$/).min(8).max(24)
    .required()
    .messages({
      'string.pattern.base': 'Username should be alphabetic',
    }),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,24}$/).min(8).max(24)
    .required()
    .messages({
      'string.pattern.base': 'Password must match atleast one camelcase, number, symbol',
    }),
  email: Joi.string().email().required(),
  mobile: Joi.string().length(10).pattern(/^\d+$/).required()
    .messages({
      'string.pattern.base': 'Enter valid mobile number',
    }),
  role: Joi.string().valid(...roles).required(),
  firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24)
    .messages({
      'string.pattern.base': 'Firstname should be alphabetic',
    }),
  lastName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24)
    .messages({
      'string.pattern.base': 'Lastname should be alphabetic',
    }),
  profile: Joi.string().optional(),
  otp: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
  status: Joi.string().optional(),
  isResetPassword: Joi.boolean().optional(),
  token: Joi.string().optional(),
  reLogin: Joi.boolean().optional(),
  isLocked: Joi.boolean().optional(),
  lockedTime: Joi.boolean().optional(),
  isLogged: Joi.boolean().optional(),
  speciality: Joi.string().optional(),
  mainSpecialityId: Joi.string().optional(),
  secondarySpecialityId: Joi.string().optional(),
  auditorManagerId: Joi.string().optional(),
  auditorAdminId: Joi.string().optional(),
});

const loginUser = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Please enter the password',
    }),
  reLogin: Joi.boolean().optional(),
  deviceToken: Joi.string().optional(),
});

const resetPassword = Joi.object().keys({
  userId: Joi.string().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,24}$/).min(8).max(24)
    .optional()
    .messages({
      'string.pattern.base': 'Password must match atleast one camelcase, number, symbol',
    }),
  isForgot: Joi.boolean().optional(),
});

const verifyOtp = Joi.object().keys({
  userId: Joi.string().required(),
  otp: Joi.string().length(6).pattern(/^\d+$/).required()
    .messages({
      'string.pattern.base': 'Enter valid OTP',
    }),
});

const sendOtp = Joi.object().keys({
  email: Joi.string().email().required(),
});

const editUser = Joi.object().keys({
  userId: Joi.string().required(),
  userName: Joi.string().regex(/^[ A-Za-z0-9_@./#&+-]*$/).min(8).max(24)
    .optional()
    .messages({
      'string.pattern.base': 'Username should be alphabetic',
    }),
  firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24)
    .optional()
    .messages({
      'string.pattern.base': 'Firstname should be alphabetic',
    }),
  lastName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(24)
    .optional()
    .messages({
      'string.pattern.base': 'Lastname should be alphabetic',
    }),
  mobile: Joi.string().length(10).pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Enter valid mobile number',
    }),
  email: Joi.string().email().optional(),
  role: Joi.string().valid(...roles).optional(),
  providerNPI: Joi.string().length(10).pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'ProviderNPI should be valid',
    }),
  location: Joi.string().optional(),
  orgName: Joi.string().optional(),
  profile: Joi.string().optional(),
  otp: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

const currentUser = Joi.object().keys({
  userId: Joi.string().required(),
});

const getUsers = Joi.object().keys({});

const updateSetting = Joi.object().keys({
  taskName: Joi.number().allow(null).optional(),
  orgTid: Joi.number().allow(null).optional(),
  location: Joi.number().allow(null).optional(),
  providerName: Joi.number().allow(null).optional(),
  patientName: Joi.number().allow(null).optional(),
  speciality: Joi.number().allow(null).optional(),
  status: Joi.number().allow(null).optional(),
  patientAccount: Joi.number().allow(null).optional(),
  audio: Joi.number().allow(null).optional(),
  transcript: Joi.number().allow(null).optional(),
  comment: Joi.number().allow(null).optional(),
  auditorName: Joi.number().allow(null).optional(),
  startDate: Joi.number().allow(null).optional(),
  endDate: Joi.number().allow(null).optional(),
  appointmentType: Joi.number().allow(null).optional(),
  encounterCollection: Joi.number().allow(null).optional(),
  mrn: Joi.number().allow(null).optional(),
  fillablePdf: Joi.number().allow(null).optional(),
  document3: Joi.number().allow(null).optional(),
});

const getDefaultSetting = Joi.object().keys({
  role: Joi.string().valid(...roles).required(),
});

const resetSetting = Joi.object().keys({});

const getSetting = Joi.object().keys({});

const auditorList = Joi.object().keys({
  role: Joi.string().valid(...roles).required(),
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

const managerList = Joi.object().keys({
  role: Joi.string().valid(...roles).required(),
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

const taskList = Joi.object().keys({
  auditorId: Joi.string().required(),
  taskAssigned: Joi.boolean().optional(),
  taskCompleted: Joi.boolean().optional(),
  overDueTask: Joi.boolean().optional(),
  taskCreated: Joi.boolean().optional(),
  taskToReview: Joi.boolean().optional(),
  pageNumber: Joi.number().optional(),
  pageSize: Joi.number().optional(),
});

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  verifyOtp,
  sendOtp,
  editUser,
  updateSetting,
  currentUser,
  auditorList,
  managerList,
  taskList,
  getDefaultSetting,
  resetSetting,
  getSetting,
  getUsers,

};
