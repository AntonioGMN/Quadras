import { jest } from '@jest/globals';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import userRepository, { createUserData } from '../../src/repositories/userRepository.js';
import * as userService from '../../src/services/userService.js';

describe('login test erro', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const createUser: createUserData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.findName(),
  };

  const user = {
    id: 10,
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.findName(),
  };

  const loginDate = {
    email: createUser.email,
    password: createUser.password,
  };

  it('return 409 from a duplicate email on sigh-up', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

    await expect(userService.signUp(createUser)).rejects.toEqual(
      { type: 'conflict', message: 'Esse email já está em uso' },
    );
  });

  it('return 401 from a not found email on login', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(userService.login(loginDate)).rejects.toEqual(
      { type: 'unauthorized', message: 'Email não encontrado' },
    );
  });

  it('return 401 from a not found email on login', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(null);

    await expect(userService.login(loginDate)).rejects.toEqual(
      { type: 'unauthorized', message: 'Senha não confere com o email' },
    );
  });
});
