const Joi = require('joi');

const createEventSchema = Joi.object({
  eventName: Joi.string().min(5).max(40).required(),
  eventDate: Joi.date().iso().required(),
  eventTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
  location: Joi.string().min(5).max(40).required(),
  eventDescription: Joi.string().min(20).max(300).required(),
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
