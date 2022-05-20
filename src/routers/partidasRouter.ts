import { Router } from 'express';
import * as partidasController from '../controllers/partidasController.js';
import validateSchema from '../middlerwares/validateSchema.js';
import validateToken from '../middlerwares/validateToken.js';
import partidaSchema from '../schemas/partidasSchema.js';

const partidasRouter = Router();
partidasRouter.get('/partidas', validateToken, partidasController.getAll);
partidasRouter.post('/partidas', validateToken, validateSchema(partidaSchema), partidasController.create);

export default partidasRouter;
