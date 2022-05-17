import partidasRepository, { createPartida } from '../repositories/partidasRepository.js';

export async function getAll() {
  const partidas = await partidasRepository.getAll();

  return partidas;
}

export async function create(partida: createPartida) {
  await partidasRepository.create(partida);
}
