import request from 'supertest';
import { TYPES } from '../../constants/types';
import { getTestServer, initializeTestContainer } from '../../../config/jest/after';

let server;

const userServiceMock = {
  getUsers: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
};

describe('UserController', () => {
  beforeAll(async () => {
    const container = initializeTestContainer();
    container.unbind(TYPES.UserService);
    container.bind(TYPES.UserService).toConstantValue(userServiceMock);
    server = await getTestServer(container);
  });

  const baseUser = { name: 'Lucia', adminStatus: false };

  describe('getAll', () => {
    it('should to get status response 200 and returns a list of users', async () => {
      userServiceMock.getUsers.mockReturnValue([{ id: '1234', name: 'name', adminStatus: false }]);

      await request(server)
        .get('/user')
        .expect(200);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      await request(server)
        .post('/user')
        .send(baseUser)
        .expect(204);
    });

    it('should returns an exception when the user name is not provided', async () => {
      await request(server)
        .post('/user')
        .send({ ...baseUser, name: undefined })
        .expect(400);
    });

    it('should returns an exception when the user adminStatus is not provided', async () => {
      await request(server)
        .post('/user')
        .send({ ...baseUser, adminStatus: undefined })
        .expect(400);
    });

    it('should call to createUser on UserService', async () => {
      await request(server)
        .post('/user')
        .send(baseUser);

      expect(userServiceMock.create).toBeCalledWith(baseUser);
    });
  });

  describe('updateUser', () => {
    it('should to get status response 204', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .send(baseUser)
        .expect(204);
    });

    it('should return an exception when the id is not a ObjectId', async () => {
      await request(server)
        .put('/user/1')
        .send(baseUser)
        .expect(400);
    });

    it('should return an exception when the user name is not provided', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .send({ ...baseUser, name: undefined })
        .expect(400);
    });

    it('should return an exception when the user adminStatus is not provided', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .send({ ...baseUser, adminStatus: undefined })
        .expect(400);
    });

    it('should call to updateUser on UserService', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .send(baseUser);

      expect(userServiceMock.update).toBeCalledWith('551137c2f9e1fac808a5f572', baseUser);
    });
  });

  describe('remove', () => {
    it('should to get status response 204', async () => {
      await request(server)
        .delete('/user/551137c2f9e1fac808a5f572')
        .expect(204);
    });

    it('should return an exception when the id is not a ObjectId', async () => {
      await request(server)
        .delete('/user/1')
        .expect(400);
    });
  });

  describe('changeAdminStatus', () => {
    it.todo('should to get status response 204');

    it.todo('should return an exception when the id is not a ObjectId');
  });
});
