import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import validateSchema from '../middlerwares/validateSchema.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();
userRouter.post('/signUp', validateSchema(userSchema), userController.signUp);

export default userRouter;
