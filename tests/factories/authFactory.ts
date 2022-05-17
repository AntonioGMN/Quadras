import { faker } from '@faker-js/faker';
import { login, signUp } from '../../src/services/userService.js';

export function userBodyFactory() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.findName(),
  };
}

export async function getTokenFactory() {
  const user = userBodyFactory();

  await signUp(user);

  const token = await login(user);
  return token;
}
