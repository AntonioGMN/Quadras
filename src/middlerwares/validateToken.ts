import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from '../utils/errorUtils.js';
import * as userService from '../services/userService.js';

export default async function validateToken(req: Request, res: Response, nest: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError('Erro com authorization header');
  const token = authorization?.replace('Bearer ', '');
  if (!token) throw unauthorizedError('Falta o token');
  const chaveSecreta = process.env.JWT_SECRET;

  try {
    const { userId } = jwt.verify(token, chaveSecreta);

    const user = await userService.findById(userId);
    res.locals.user = user;
  } catch {
    return res.status(401).send('invalide token');
  }

  return nest();
}
