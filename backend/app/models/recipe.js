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

const RecipeSchema = new Schema(
  {
    id: { type: String, default: uuid, unique: true },
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      required: getRequiredFiledMessage('title'),
      trim: true,
    },
    category: {
      type: String,
      required: getRequiredFiledMessage('category'),
      trim: true,
    },
    ingredients: [],
    instructions:[],
    date:{ type: Date, default: new Date() },
  },
  options,
);

module.exports = mongoose.model('Recipe', RecipeSchema);