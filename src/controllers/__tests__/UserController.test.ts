import { server } from '../../server/express';
import request from 'supertest';

describe('UserController', () => {
  describe('getUsers', () => {
    it('should returns a list of users', async () => {
      const expectedBody = [{ id: '1234', name: 'name', surname: 'surname' }];

      await request(server.build())
        .get('/user')
        .expect(200)
        .expect(expectedBody);
    });
  });
});
