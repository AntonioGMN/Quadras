import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import validateSchema from '../middlerwares/validateSchema.js';
import validateToken from '../middlerwares/validateToken.js';
import loginData from '../schemas/loginDataSchema.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();
userRouter.post('/signUp', validateSchema(userSchema), userController.signUp);
userRouter.post('/login', validateSchema(loginData), userController.login);
userRouter.get('/users', validateToken, userController.findUser);

export default userRouter;
