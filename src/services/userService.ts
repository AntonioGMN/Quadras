import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository, { createUserData } from '../repositories/userRepository.js';
import { conflictError, unauthorizedError } from '../utils/errorUtils.js';

export async function signUp(userData: createUserData) {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) throw conflictError('Esse email já está em uso');

  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  const hashUser = { ...userData, password: hashedPassword };

  await userRepository.create(hashUser);
  return null;
}

export async function login(loginData) {
  const user = await userRepository.findByEmail(loginData.email);
  if (!user) throw unauthorizedError('Email não encontrado');

  const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
  if (!isPasswordValid) throw unauthorizedError('Senha não confere com o email');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}

export async function findById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw unauthorizedError('Usuario não encontrado para esse id');

  return user;
}
