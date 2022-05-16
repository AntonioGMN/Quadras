import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export async function signUp(req: Request, res: Response) {
  const user = req.body;

  await userService.signUp(user);

  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const user = req.body;

  const token = await userService.login(user);

  res.send(token).status(200);
}

export async function findUser(req: Request, res: Response) {
  const { user } = res.locals;

  res.send(user).status(200);
}
