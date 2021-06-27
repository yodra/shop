import request from 'supertest';
import { getServer } from '../../../config/jest/after';

let server;

describe('UserController', () => {
  beforeAll(async () => {
    server = await getServer();
  });

  describe('getUsers', () => {
    //TODO mock repository
    xit('should returns a list of users', async () => {
      const expectedBody = [{ id: '1234', name: 'name', surname: 'surname' }];
      await request(server)
        .get('/user')
        .expect(200)
        .expect(expectedBody);
    });
  });
});
