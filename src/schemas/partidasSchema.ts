import joi from 'joi';

const partidaSchema = joi.object({
  name: joi.string().required(),
  date: joi.date().required(),
  inicio: joi.string().required(),
  termino: joi.string(),
  local: joi.string().required(),
  creatorId: joi.number().required(),
});

export default partidaSchema;
