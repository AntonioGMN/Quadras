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

function findById(id: number) {
  return prisma.users.findUnique({
    where: {
      id,
    },
  });
}

export default {
  create,
  findByEmail,
  findById,
};
