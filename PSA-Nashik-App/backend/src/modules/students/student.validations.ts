


import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  phone: Joi.string().required().pattern(/^[0-9]{10}$/),
  photoUrl: Joi.string().uri().optional(),
  sportId: Joi.number().required().positive(),
  batchId: Joi.number().required().positive(),
  joiningDate: Joi.date().required()
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  photoUrl: Joi.string().uri(),
  sportId: Joi.number().positive(),
  batchId: Joi.number().positive(),
  joiningDate: Joi.date()
}).min(1);

export const studentIdSchema = Joi.object({
  id: Joi.number().required().positive()
});

export const sportIdSchema = Joi.object({
  sportId: Joi.number().required().positive()
});

export const batchIdSchema = Joi.object({
  batchId: Joi.number().required().positive()
});


