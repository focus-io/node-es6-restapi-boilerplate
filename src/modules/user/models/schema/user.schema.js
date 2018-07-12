const mongoose = require('mongoose');
const userEnum = require('../../utils/user.enum');

/**
 * User Schema
 * @private
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 64,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 64,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  phone: {
    type: Number,
    index: true,
    unique: true,
    maxlength: 10,
  },
  // _address: [{
  //   type: mongoose.Types.ObjectId,
  //   // ref: 'Address',
  // }],
  gender: {
    type: String,
    index: true,
    enum: userEnum.gender,
    default: 'na',
  },
  birthDate: {
    type: Date,
  },
  picture: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
  },
  role: {
    type: String,
    index: true,
    enum: userEnum.roles,
    default: 'user',
  },
  serviceProvider: {
    type: String,
    enum: userEnum.provider,
    default: 'local',
  },
  // services: {
  //   facebook: { type: mongoose.Types.Mixed },
  //   google: { type: mongoose.Types.Mixed },
  //   twitter: { type: mongoose.Types.Mixed },
  //   linkedin: { type: mongoose.Types.Mixed },
  // },
  activate: {
    token: {
      type: String,
    },
    expireAt: {
      type: Date,
    },
  },
  reset: {
    token: {
      type: String,
    },
    expireAt: {
      type: Date,
    },
  },
  activeFlag: {
    type: Boolean,
    default: false,
  },
  verifiedFlag: {
    type: Boolean,
    default: false,
  },
  deleteFlag: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.index({ deleteFlag: 1, activeFlag: 1, verifiedFlag: 1 });
UserSchema.index({ verifiedFlag: 1, email: 1, createdAt: -1 });

/**
 * export the schema
 */
module.exports = UserSchema;