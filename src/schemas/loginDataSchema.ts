import joi from 'joi';

const loginData = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default loginData;
