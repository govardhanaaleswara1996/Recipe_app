'use strict';

const Joi = require('joi');

const createAppointment = Joi.object({
  appointmentDate: Joi.date().iso().required(),
  physicianId: Joi.string().required(),
  edit: Joi.boolean().optional(),
  totalAppointments: Joi.string().optional(),
  appointments: Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    duration: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.string().optional(),
    time: Joi.date().iso().required(),
    type: Joi.string().optional(),
    patientID: Joi.string().optional(),
    patientDateOfBirth: Joi.string().required(),
    patientGender: Joi.string().required(),
    patientMRN: Joi.string().required(),
    patientSSN: Joi.string().required(),
    patientFirstName: Joi.string().required(),
    patientLastName: Joi.string().required(),
    appointmentReason: Joi.string().required(),
    referringProvider: Joi.string().optional(),
    appointmentLocationAddress: Joi.string().optional(),
    timezone: Joi.string().optional(),
    appointmentType: Joi.string().required(),
  })),
});

const editAppointment = Joi.object({
  appointmentDate: Joi.date().iso().required(),
  physicianId: Joi.string().required(),
  edit: Joi.boolean().optional(),
  appointments: Joi.array().items(Joi.object({
    id: Joi.string().required(),
    duration: Joi.string().optional(),
    location: Joi.string().optional(),
    time: Joi.date().iso().optional(),
    patientMRN: Joi.string().required(),
    appointmentReason: Joi.string().optional(),
    status: Joi.string().optional(),
  })),
});

const scheduleAppointment = Joi.object({
  appointmentDate: Joi.date().iso().required(),
  physicianId: Joi.string().required(),
  totalAppointments: Joi.string().optional(),
  appointments: Joi.array().items(Joi.object({
    id: Joi.string().required(),
    duration: Joi.string().required(),
    location: Joi.string().optional(),
    status: Joi.string().required(),
    time: Joi.string().required(),
    type: Joi.string().optional(),
    patientID: Joi.string().required(),
    patientDateOfBirth: Joi.string().required(),
    patientGender: Joi.string().required(),
    patientMRN: Joi.string().required(),
    patientSSN: Joi.string().required(),
    patientFirstName: Joi.string().required(),
    patientLastName: Joi.string().required(),
    appointmentReason: Joi.string().optional(),
    referringProvider: Joi.string().optional(),
    appointmentLocationAddress: Joi.string().optional(),
    timezone: Joi.string().optional(),
  })),
});

const getAppointment = Joi.object().keys({
  date: Joi.date().required(),
});

const fetchAppointments = Joi.object().keys({
  appointmentId: Joi.string().required(),
});

const getPatients = Joi.object().keys({
  mrn: Joi.string().optional(),
  ssn: Joi.string().optional(),
});

const searchPatients = Joi.object().keys({
  mrn: Joi.string().required(),
  ssn: Joi.string().required(),
});

module.exports = {
  createAppointment,
  getAppointment,
  getPatients,
  searchPatients,
  scheduleAppointment,
  editAppointment,
  fetchAppointments,
};
