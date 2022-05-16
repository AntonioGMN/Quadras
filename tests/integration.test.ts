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

  const createUser: createUserData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.findName(),
  };

  it('successful signUp', async () => {
    const result = await supertest(app).post('/signUp').send(createUser);
    const foundUser = prisma.users.findUnique({
      where: {
        email: createUser.email,
      },
    });

    expect(result.status).toEqual(201);
    expect(foundUser).not.toBeNull();
  });

  it('successful login', async () => {
    const loginData = {
      email: createUser.email,
      password: createUser.password,
    };

    await supertest(app).post('/signUp').send(createUser);
    const result = await supertest(app).post('/login').send(loginData);

    expect(result.status).toEqual(200);
  });

  it('reccessful search for a user using a email', async () => {
    await supertest(app).post('/signUp').send(createUser);
    const result = await supertest(app).get('/users').send(createUser.email);

    expect(result.status).toEqual(200);
  });
});
