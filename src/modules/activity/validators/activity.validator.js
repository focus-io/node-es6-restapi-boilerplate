const Joi = require('joi');

module.exports = {
  list: {
    headers: {
      authorization: Joi.string().required(),
    },
    query: {
      select: Joi.string().trim().required(),
      offset: Joi.number(),
      limit: Joi.number(),
      order: Joi.string().trim(),
      sort: Joi.string().trim(),
    },
  },
  get: {
    headers: {
      authorization: Joi.string().required(),
    },
    params: {
      activityId: Joi.string().required(),
    },
  },
  create: {
    headers: {
      authorization: Joi.string().required(),
    },
    body: {
      street: Joi.string().trim(),
      area: Joi.string().trim(),
      city: Joi.string().trim(),
      state: Joi.string().trim(),
      landmark: Joi.string().trim(),
      pincode: Joi.number(),
      lat: Joi.number(),
      long: Joi.number(),
      tag: Joi.string(),
    },
  },
  update: {
    headers: {
      authorization: Joi.string().required(),
    },
    params: {
      activityId: Joi.string().required(),
    },
    body: {
      street: Joi.string().trim(),
      area: Joi.string().trim(),
      city: Joi.string().trim(),
      state: Joi.string().trim(),
      landmark: Joi.string().trim(),
      pincode: Joi.number(),
      lat: Joi.number(),
      long: Joi.number(),
      tag: Joi.string(),
    },
  },
  delete: {
    headers: {
      authorization: Joi.string().required(),
    },
    params: {
      activityId: Joi.string().required(),
    },
  },
};
