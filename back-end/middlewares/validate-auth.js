const Joi = require('joi');

const loginAndRegisterSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9]+$/)
    .required(),
  password: Joi.string().min(3).max(50).required(),
});

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnkown: true,
};

const validateAuth = (req, res, next) => {
  const {error, value} = loginAndRegisterSchema.validate(
    req.body,
    validationOptions
  );

  if (error) {
    return res.status(400).json({error: error.details});
  } else {
    req.body = value;
    return next();
  }
};

module.exports = {validateAuth};
