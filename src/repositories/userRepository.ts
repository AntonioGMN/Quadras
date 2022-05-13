import { users } from '@prisma/client';
import prisma from '../database.js';

export type createUserData = Omit<users, 'id'>

function create(createUser: createUserData) {
  return prisma.users.create({
    data: createUser,
  });
}

function findByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}

export default {
  create,
  findByEmail,
};
