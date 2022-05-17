import { Router } from 'express';
import partidasRouter from './partidasRouter.js';
import userRouter from './userRouter.js';

const router = Router();
router.use(userRouter);
router.use(partidasRouter);

export default router;
