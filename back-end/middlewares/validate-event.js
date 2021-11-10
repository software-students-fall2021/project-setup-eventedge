const Joi = require('joi');

const createEventSchema = Joi.object({
  name: Joi.string().min(5).max(40).required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  location: Joi.string().min(5).max(40).required(),
  description: Joi.string().min(20).max(300).required(),
});

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnkown: true,
};

const validateCreateEvent = (req, res, next) => {
  const {error, value} = createEventSchema.validate(
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

module.exports = {validateCreateEvent};
