const { Schema, model } = require('mongoose');

const Joi = require('joi');

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.number().min(6).required(),
  subscription: Joi.string(),
});

const User = model('user', usersSchema);

module.exports = {
  User,
  joiSchema,
};
