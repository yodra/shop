import request from 'supertest';
import { getServer } from '../../../config/jest/after';
import { Container } from 'inversify';
import { TYPES } from '../../constants/types';

let server;

const userServiceMock = {
  getUsers: jest.fn()
};

describe('UserController', () => {
  beforeAll(async () => {
    const container = new Container();
    container.bind(TYPES.UserService).toConstantValue(userServiceMock);
    server = await getServer(container);
  });

  describe('getUsers', () => {
    it('should to get status response 200 and returns a list of users', async () => {
      userServiceMock.getUsers.mockReturnValue([{ id: '1234', name: 'name', surname: 'surname' }]);

      const expectedBody = [{ id: '1234', name: 'name', surname: 'surname' }];
      await request(server)
        .get('/user')
        .expect(200)
        .expect(expectedBody);
    });
  });
});
