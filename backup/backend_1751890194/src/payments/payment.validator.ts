
import Joi from 'joi';

export const validatePaymentRequest = (data: unknown) => {
  const schema = Joi.object({
    amount: Joi.number().min(100).required(),
    studentId: Joi.string().required(),
    currency: Joi.string().valid('INR').default('INR')
  });

  return schema.validate(data, { abortEarly: false });
};
