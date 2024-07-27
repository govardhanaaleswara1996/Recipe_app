'use strict';

const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const { roles, USER } = require('../constants/roles');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const UserSchema = new Schema(
  {
    id: { type: String, default: uuid, unique: true },
    userName: {
      type: String,
      unique: true,
      required: getRequiredFiledMessage('userName'),
      trim: true,
    },
    email: {
      type: String,
      required: getRequiredFiledMessage('Email'),
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: getRequiredFiledMessage('password'),
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: roles,
      default: USER,
      trim: true,
    },
    isLogged : { type: Boolean, default: false },
  },
  options,
);

module.exports = mongoose.model('User', UserSchema);