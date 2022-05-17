import joi from 'joi';

const partidaSchema = joi.object({
  name: joi.string().required(),
  data: joi.date().required(),
  incio: joi.date().required(),
  termino: joi.date(),
  localId: joi.number().required(),
  creatorId: joi.number().required(),
});

export default partidaSchema;
