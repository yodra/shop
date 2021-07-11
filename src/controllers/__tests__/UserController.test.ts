import request from 'supertest';
import { TYPES } from '../../constants/types';
import { adminTokenMocked, getTestServer, initializeTestContainer, userTokenMocked } from '../../../config/jest/after';

let server;

const userServiceMock = {
  getUsers: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  changeAdminStatus: jest.fn()
};

describe('UserController', () => {
  beforeAll(async () => {
    const container = initializeTestContainer();
    container.unbind(TYPES.UserService);
    container.bind(TYPES.UserService).toConstantValue(userServiceMock);
    server = await getTestServer(container);
  });

  const baseUser = { name: 'Lucia', isAdmin: false };

  describe('getAll', () => {
    it('should to get a list of user', async () => {
      userServiceMock.getUsers.mockReturnValue([{
        _id: '551137c2f9e1fac808a5f572',
        name: 'Lucia',
        isAdmin: false,
        createAt: new Date(),
        lastUpdatedAt: new Date()
      }]);

      await request(server)
        .get('/user')
        .set('Cookie', adminTokenMocked)
        .expect(200)
        .expect([{
          id: '551137c2f9e1fac808a5f572',
          name: 'Lucia',
          isAdmin: false
        }]);
    });

    it('should not to get a list of user for anonymous user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .get('/user')
        .expect(403);
    });

    it('should not to get a list of user for a no admin user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .get('/user')
        .set('Cookie', userTokenMocked)
        .expect(403);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      await request(server)
        .post('/user')
        .set('Cookie', adminTokenMocked)
        .send(baseUser)
        .expect(204);
    });

    it('should returns an exception when the user name is not provided', async () => {
      await request(server)
        .post('/user')
        .set('Cookie', adminTokenMocked)
        .send({ ...baseUser, name: undefined })
        .expect(400);
    });

    it('should returns an exception when the user isAdmin is not provided', async () => {
      await request(server)
        .post('/user')
        .set('Cookie', adminTokenMocked)
        .send({ ...baseUser, isAdmin: undefined })
        .expect(400);
    });

    it('should call to createUser on UserService', async () => {
      await request(server)
        .post('/user')
        .set('Cookie', adminTokenMocked)
        .send(baseUser);

      expect(userServiceMock.create).toBeCalledWith(baseUser);
    });

    it('should not to create a user for anonymous user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .post('/user')
        .send(baseUser)
        .expect(403);
    });

    it('should not to create a user for a no admin user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .post('/user')
        .set('Cookie', userTokenMocked)
        .send(baseUser)
        .expect(403);
    });
  });

  describe('updateUser', () => {
    it('should to update a user', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send(baseUser)
        .expect(204);
    });

    it('should return an exception when the id is not a ObjectId', async () => {
      await request(server)
        .put('/user/1')
        .set('Cookie', adminTokenMocked)
        .send(baseUser)
        .expect(400);
    });

    it('should return an exception when the user name is not provided', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send({ ...baseUser, name: undefined })
        .expect(400);
    });

    // TODO this change in other endpoint
    it('should return an exception when the user isAdmin is not provided', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send({ ...baseUser, isAdmin: undefined })
        .expect(400);
    });

    it('should call to updateUser on UserService', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send(baseUser);

      expect(userServiceMock.update).toBeCalledWith('551137c2f9e1fac808a5f572', baseUser);
    });

    it('should not to update a user for anonymous user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .send(baseUser)
        .expect(403);
    });

    it('should not to update a user for a no admin user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', userTokenMocked)
        .send(baseUser)
        .expect(403);
    });
  });

  describe('remove', () => {
    it('should to remove a user by id', async () => {
      await request(server)
        .delete('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .expect(204);
    });

    it('should return an exception when the id is not a ObjectId', async () => {
      await request(server)
        .delete('/user/1')
        .set('Cookie', adminTokenMocked)
        .expect(400);
    });

    it('should not to remove a user for anonymous user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .delete('/user/551137c2f9e1fac808a5f572')
        .expect(403);
    });

    it('should not to remove a user for a no admin user', async () => {
      userServiceMock.getUsers.mockReturnValue([]);

      await request(server)
        .delete('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', userTokenMocked)
        .expect(403);
    });
  });

  describe('changeAdminStatus', () => {
    it('should to change the admin status of a user', async () => {
      await request(server)
        .put('/user/admin/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send({ isAdmin: true })
        .expect(204);
    });

    it('should return an exception when the id is not a ObjectId', async () => {
      await request(server)
        .put('/user/admin/1')
        .set('Cookie', adminTokenMocked)
        .send({ isAdmin: true })
        .expect(400);
    });

    it('should return an exception when the user isAdmin is not provided', async () => {
      await request(server)
        .put('/user/admin/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send({})
        .expect(400);
    });

    it('should return an exception when the user isAdmin is not provided', async () => {
      await request(server)
        .put('/user/admin/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send({})
        .expect(400);
    });

    it('should not to change the admin status of a user for anonymous user', async () => {
      await request(server)
        .put('/user/admin/551137c2f9e1fac808a5f572')
        .send(baseUser)
        .expect(403);
    });

    it('should not to to change the admin status of a user for a no admin user', async () => {
      await request(server)
        .put('/user/admin/551137c2f9e1fac808a5f572')
        .set('Cookie', userTokenMocked)
        .send(baseUser)
        .expect(403);
    });

    it('should call to changeAdminStatus on UserService', async () => {
      await request(server)
        .put('/user/551137c2f9e1fac808a5f572')
        .set('Cookie', adminTokenMocked)
        .send({ isAdmin: true });

      expect(userServiceMock.changeAdminStatus).toBeCalledWith('551137c2f9e1fac808a5f572', { isAdmin: true });
    });

  });
});
