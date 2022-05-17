import { Request, Response } from 'express';
import * as partidasService from '../services/partidasService.js';

export async function getAll(req: Request, res: Response) {
  const partidas = await partidasService.getAll();

  res.send(partidas).status(200);
}

export async function create(req: Request, res: Response) {
  const partida = req.body;
  await partidasService.create(partida);

  res.sendStatus(201);
}
