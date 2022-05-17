import { partidas } from '@prisma/client';
import prisma from '../database.js';

export type createPartida = Omit<partidas, 'id'>

function getAll() {
  return prisma.partidas.findMany();
}

function create(partida: createPartida) {
  return prisma.partidas.create({
    data: partida,
  });
}

export default {
  getAll,
  create,
};
