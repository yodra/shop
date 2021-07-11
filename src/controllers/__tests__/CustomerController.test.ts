import { getTestServer, initializeTestContainer, userTokenMocked } from '../../../config/jest/after';
import request from 'supertest';
import { TYPES } from '../../constants/types';
import { CustomerService } from '../../services/CustomerService';

let server;
const customerServiceMock: Partial<CustomerService> = {
  getAllCustomers: jest.fn(),
  createCustomer: jest.fn(),
  removeCustomer: jest.fn(),
  updateCustomer: jest.fn(),
  getCustomer: jest.fn()
};

describe('CustomerController', () => {
  beforeAll(async () => {
    const container = initializeTestContainer();
    container.unbind(TYPES.CustomerService);
    container.bind(TYPES.CustomerService).toConstantValue(customerServiceMock);
    server = await getTestServer(container);
  });

  describe('getCustomers', () => {
    const date = new Date();
    it('should get a list of customers', async () => {
      customerServiceMock.getAllCustomers = jest.fn().mockReturnValue([{
        _id: '60e89506e539964350155a54',
        id: '11111111H',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aPhotoKey',
        createdAt: date,
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

  describe('getCustomer', () => {
    it('should get a customer by id', async () => {
      customerServiceMock.getCustomer = jest.fn().mockReturnValue({});

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

      expect(customerServiceMock.getCustomer).toBeCalledWith('11111111H');
    });
  });

  describe('createCustomer', () => {
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

    it('should call to createCustomer on CustomerService', async () => {
      await request(server)
        .post('/customer')
        .set('Cookie', userTokenMocked)
        .send({ ...baseCustomer });

      expect(customerServiceMock.createCustomer).toBeCalledWith({
        id: 'businessId',
        name: 'Ana',
        lastname: 'Morales',
        createdBy: '551137c2f9e1fac808a5f572'
      });
    });
  });

  describe('removeCustomer', () => {
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

  describe('updateCustomer', () => {
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

      expect(customerServiceMock.updateCustomer).toBeCalledWith('11111111H', {
        ...baseCustomer,
        lastUpdatedBy: '551137c2f9e1fac808a5f572'
      });
    });

    it('should call to updateCustomer on CustomerService', async () => {
      await request(server)
        .put('/customer/11111111H')
        .set('Cookie', userTokenMocked)
        .send(baseCustomer);

      expect(customerServiceMock.updateCustomer).toBeCalledWith('11111111H', {
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
});
