import supertest from 'supertest';
import faker from '@faker-js/faker';
import app from '../src/app.js';
import { createUserData } from '../src/repositories/userRepository.js';
import prisma from '../src/database.js';

describe('users tests', () => {
  afterEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('successful signUp', async () => {
    const createUser: createUserData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    };

    const result = await supertest(app).post('/signUp').send(createUser);
    const foundUser = prisma.users.findUnique({
      where: {
        email: createUser.email,
      },
    });

    expect(result.status).toEqual(201);
    expect(foundUser).not.toBeNull();
  });
});
