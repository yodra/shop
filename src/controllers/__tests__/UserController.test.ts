import request from 'supertest';
import { TYPES } from '../../constants/types';
import { getTestServer, initializeTestContainer } from '../../../config/jest/after';
import { User } from '../../models/User';

let server;

const userServiceMock = {
  getUsers: jest.fn()
};

describe('UserController', () => {
  beforeAll(async () => {
    const container = initializeTestContainer();
    container.unbind(TYPES.UserService);
    container.bind(TYPES.UserService).toConstantValue(userServiceMock);
    server = await getTestServer(container);
  });

  describe('getUsers', () => {
    it('should to get status response 200 and returns a list of users', async () => {
      userServiceMock.getUsers.mockReturnValue([{ id: '1234', name: 'name', lastname: 'lastname' }]);

      const expectedBody: User[] = [{ id: '1234', name: 'name', lastname: 'lastname' }];
      await request(server)
        .get('/user')
        .expect(200)
        .expect(expectedBody);
    });
  });

  describe('createUser', () => {
    it.todo('should create a new user');

    it.todo('should returns an exception when the user name is not provided');

    it.todo('should returns an exception when the user lastname is not provided');

    it.todo('should return an exception when the id is not a ObjectId');
  });

  describe('updateUser', () => {
    it.todo('should to get status response 204');

    it.todo('should return an exception when the id is not a ObjectId');

    it.todo('should return an exception when the user name is not provided');

    it.todo('should return an exception when the user lastname is not provided');

    it.todo('should call to updateUser on UserService');
  });

  describe('removeUser', () => {
    it.todo('should to get status response 204');

    it.todo('should return an exception when the id is not a ObjectId');
  });

  describe('changeAdminStatus', () => {
    it.todo('should to get status response 204');

    it.todo('should return an exception when the id is not a ObjectId');
  });
});
