import {
  getTestServer,
  initializeTestContainer,
  userIncompleteTokenMocked,
  userTokenMocked
} from '../../../config/jest/after';
import request from 'supertest';
import { TYPES } from '../../constants/types';
import { CustomerService } from '../../services/CustomerService';

let server;
const customerServiceMock: Partial<CustomerService> = {
  getAll: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  uploadPhoto: jest.fn()
};

describe('CustomerController', () => {
  beforeAll(async () => {
    const container = initializeTestContainer();
    container.unbind(TYPES.CustomerService);
    container.bind(TYPES.CustomerService).toConstantValue(customerServiceMock);
    server = await getTestServer(container);
  });

  describe('get', () => {
    const date = new Date();
    it('should get a list of customers', async () => {
      customerServiceMock.getAll = jest.fn().mockReturnValue([{
        _id: '60e89506e539964350155a54',
        id: '11111111H',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aPhotoKey',
        createdAt: date,
        lastUpdatedAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }]);

      await request(server)
        .get('/customer')
        .set('Cookie', userTokenMocked)
        .expect(200)
        .expect([{
          id: '11111111H',
          name: 'aName',
          lastname: 'aLastname',
          photo: 'shop-tam-s3.s3.eu-west-1.amazonaws.com/aPhotoKey',
          createdBy: '551137c2f9e1fac808a5f572'
        }]);
    });

    it('should not get a list of customers for anonymous user', async () => {
      await request(server)
        .get('/customer')
        .expect(403);
    });
  });

  describe('get', () => {
    it('should get a customer by id', async () => {
      customerServiceMock.get = jest.fn().mockReturnValue({});

      await request(server)
        .get('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .expect(200);
    });

    it('should not get a customer for anonymous user', async () => {
      await request(server)
        .get('/customer/11111111H')
        .expect(403);
    });

    it('should call to getCustomer on CustomerService', async () => {
      await request(server)
        .get('/customer/11111111H')
        .set('Cookie', userTokenMocked);

      expect(customerServiceMock.get).toBeCalledWith('11111111H');
    });
  });

  describe('create', () => {
    const baseCustomer = { id: 'businessId', name: 'Ana', lastname: 'Morales' };

    it('should create a new customer', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userTokenMocked)
        .send(baseCustomer)
        .expect(204);
    });

    it('should returns an exception when the customer business id is not provided', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer, id: undefined })
        .expect(400);
    });

    it('should returns an exception when the customer name is not provided', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer, name: undefined })
        .expect(400);
    });

    it('should returns an exception when the customer lastname is not provided', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer, lastname: undefined })
        .expect(400);
    });

    it('should not create a new customer for anonymous user', async () => {
      await request(server)
        .post('/customer')
        .send({ ...baseCustomer })
        .expect(403);
    });

    it('should not create a new customer for user without id', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userIncompleteTokenMocked)
        .send({ ...baseCustomer })
        .expect(403);
    });

    it('should call to createCustomer on CustomerService', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer });

      expect(customerServiceMock.create).toBeCalledWith({
        id: 'businessId',
        name: 'Ana',
        lastname: 'Morales',
        createdBy: '551137c2f9e1fac808a5f572'
      });
    });
  });

  describe('remove', () => {
    it('should remove a customer by id', async () => {
      await request(server)
        .delete('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .expect(204);
    });

    it('should not remove a customer for anonymous user', async () => {
      await request(server)
        .delete('/customer/11111111H')
        .expect(403);
    });
  });

  describe('update', () => {
    const baseCustomer = { name: 'Ana', lastname: 'Morales' };

    it('should update a customer by id', async () => {
      await request(server)
        .put('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .send(baseCustomer)
        .expect(204);
    });

    it('should return an exception when the customer name is not provided', async () => {
      await request(server)
        .put('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer, name: undefined })
        .expect(400);
    });

    it('should return an exception when the customer lastname is not provided', async () => {
      await request(server)
        .put('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer, lastname: undefined })
        .expect(400);
    });

    it('should not update the id of a customer', async () => {
      await request(server)
        .put('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer, id: '22222222P' });

      expect(customerServiceMock.update).toBeCalledWith('11111111H', {
        ...baseCustomer,
        lastUpdatedBy: '551137c2f9e1fac808a5f572'
      });
    });

    it('should call to updateCustomer on CustomerService', async () => {
      await request(server)
        .put('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .send(baseCustomer);

      expect(customerServiceMock.update).toBeCalledWith('11111111H', {
        ...baseCustomer,
        lastUpdatedBy: '551137c2f9e1fac808a5f572'
      });
    });

    it('should not update a customer for anonymous user', async () => {
      await request(server)
        .put('/customer/11111111H')
        .send(baseCustomer)
        .expect(403);
    });
  });

  describe('addPhoto', () => {
    it('should upload a new photo for a customer', async function () {
      await request(server)
        .put('/customer/photo/11111111H')
        .attach('photo', 'config/mocks/150.png')
        .set('Cookie', userTokenMocked)
        .expect(204);
    });

    it('should return an exception when photo is not provided', async function () {
      await request(server)
        .put('/customer/photo/11111111H')
        .set('Cookie', userTokenMocked)
        .send({ files: null })
        .expect(400);
    });

    it('should return an exception when the type of photo is invalid', async function () {
      await request(server)
        .put('/customer/photo/11111111H')
        .set('Cookie', userTokenMocked)
        .send({
          files: {
            file: {
              mimetype: 'image/gif'
            }
          }
        })
        .expect(400);
    });
  });
});
