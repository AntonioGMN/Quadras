import { Router } from 'express';
import * as partidasController from '../controllers/partidasController.js';
import validateSchema from '../middlerwares/validateSchema.js';
import validateToken from '../middlerwares/validateToken.js';
import partidaSchema from '../schemas/partidasSchema.js';

const partidasRouter = Router();
partidasRouter.get('/meeting', partidasController.getAll);
partidasRouter.post('/meeting', validateToken, validateSchema(partidaSchema), partidasController.create);

export default partidasRouter;
