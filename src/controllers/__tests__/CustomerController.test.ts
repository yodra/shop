import { getTestServer, initializeTestContainer } from '../../../config/jest/after';
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
    it('should to get status response 200', async () => {
      customerServiceMock.getAllCustomers = jest.fn().mockReturnValue([]);

      await request(server)
        .get('/customer')
        .expect(200);
    });
  });

  describe('createCustomer', () => {
    const baseCustomer = { name: 'Ana', lastname: 'Morales' };

    it('should create a new customer', async () => {
      await request(server)
        .post('/customer')
        .send(baseCustomer)
        .expect(204);
    });

    it('should returns an exception when the customer name is not provided', async () => {
      await request(server)
        .post('/customer')
        .send({ ...baseCustomer, name: undefined })
        .expect(400);
    });

    it('should returns an exception when the customer lastname is not provided', async () => {
      await request(server)
        .post('/customer')
        .send({ ...baseCustomer, lastname: undefined })
        .expect(400);
    });

    it('should call to createCustomer on CustomerService', async () => {
      await request(server)
        .post('/customer')
        .send({ ...baseCustomer });

      expect(customerServiceMock.createCustomer).toBeCalledWith(baseCustomer);
    });
  });

  describe('removeCustomer', () => {
    it('should to get status response 204', async () => {
      await request(server)
        .delete('/customer/1')
        .expect(204);
    });

    it.todo('should return an exception when the id is not a ObjectId');
  });

  describe('updateCustomer', () => {
    const baseCustomer = { name: 'Ana', lastname: 'Morales' };
    it('should to get status response 204', async () => {
      await request(server)
        .put('/customer/1')
        .send(baseCustomer)
        .expect(204);
    });

    it.todo('should return an exception when the id is not a ObjectId');

    it('should return an exception when the customer name is not provided', async () => {
      await request(server)
        .put('/customer/1')
        .send({ ...baseCustomer, name: undefined })
        .expect(400);
    });


    it('should return an exception when the customer lastname is not provided', async () => {
      await request(server)
        .put('/customer/1')
        .send({ ...baseCustomer, lastname: undefined })
        .expect(400);
    });

    it('should call to updateCustomer on CustomerService', async () => {
      await request(server)
        .put('/customer/1')
        .send(baseCustomer);

      expect(customerServiceMock.updateCustomer).toBeCalledWith('1', baseCustomer);
    });
  });

  describe('getCustomer', () => {
    it('should to get status response 200', async () => {
      customerServiceMock.getCustomer = jest.fn().mockReturnValue({});

      await request(server)
        .get('/customer/1')
        .expect(200);
    });

    it.todo('should return an exception when the id is not a ObjectId');

    it('should call to getCustomer on CustomerService', async () => {
      await request(server)
        .get('/customer/1');

      expect(customerServiceMock.getCustomer).toBeCalledWith('1');
    });
  });
});
