const Joi = require('joi');

const createChatSchema = Joi.object({
  chatName: Joi.string().min(5).max(40).required(),
  usersList: Joi.array().items(Joi.string()).min(1).required(),
});

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnkown: true,
};

const validateCreateChat = (req, res, next) => {
  const {error, value} = createChatSchema.validate(req.body, validationOptions);

  if (error) {
    return res.status(400).json({error: error.details});
  } else {
    req.body = value;
    return next();
  }
};

module.exports = {validateCreateChat};
