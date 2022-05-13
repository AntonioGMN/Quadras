import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository, { createUserData } from '../repositories/userRepository.js';
import { conflictError } from '../utils/errorUtils.js';

export async function signUp(userData: createUserData) {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) throw conflictError('This email is already in use');

  const hashedPassword = bcrypt.hashSync(userData.password, 10);

  const hashUser = { ...userData, password: hashedPassword };

  await userRepository.create(hashUser);
  return null;
}

export async function login() {
  return null;
}
