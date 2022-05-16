import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

import router from './routers/index.js';
import errorHandlerMiddleware from './middlerwares/errorHandlingMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
