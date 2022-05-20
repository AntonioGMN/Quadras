import supertest from 'supertest';
import faker from '@faker-js/faker';
import app from '../src/app.js';
import { createUserData } from '../src/repositories/userRepository.js';
import prisma from '../src/database.js';
import { getTokenFactory, userBodyFactory } from './factories/authFactory.js';

describe('users tests', () => {
  afterEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users, partidas CASCADE`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const createUser: createUserData = userBodyFactory();

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
    const token = await getTokenFactory();
    const result = await supertest(app).get('/users').send(createUser.email).set('Authorization', `${token}`);

    expect(result.status).toEqual(200);
  });
});

describe('partidas tests', () => {
  afterEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users, partidas CASCADE`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('return 200 on get partidas', async () => {
    const token = await getTokenFactory();
    const result = await supertest(app).get('/partidas').set('Authorization', `${token}`);
    const partidas = prisma.partidas.findMany();

    expect(result.status).toEqual(200);
    expect(partidas).not.toBeNull();
  });

  it('return 201 on create a partida', async () => {
    const createUser: createUserData = userBodyFactory();
    const user = await prisma.users.create({ data: createUser });

    const partidaBody = {
      name: faker.name.findName(),
      date: faker.date.future(),
      inicio: '15:00',
      termino: '18:00',
      local: faker.name.findName(),
      creatorId: user.id,
    };

    const token = await getTokenFactory();
    const result = await supertest(app).post('/partidas').send(partidaBody).set('Authorization', `${token}`);

    expect(result.status).toEqual(201);
  });
});
