import request from 'supertest';
import { TYPES } from '../../constants/types';
import { getTestServer } from '../../../config/jest/after';
import { initializeContainer } from '../../configurations/ioc';

let server;

const userServiceMock = {
  getUsers: jest.fn()
};

describe('UserController', () => {
  beforeAll(async () => {
    const container = initializeContainer();
    container.unbind(TYPES.UserService);
    container.bind(TYPES.UserService).toConstantValue(userServiceMock);
    server = await getTestServer(container);
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
