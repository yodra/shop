import { getTestServer, initializeTestContainer } from '../../../config/jest/after';
import request from 'supertest';
import { TYPES } from '../../constants/types';

let server;
const customerServiceMock = {
  getCustomers: jest.fn()
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
      customerServiceMock.getCustomers.mockReturnValue([]);

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

    // TODO move to service
    it.todo('should returns an exception when the customer already exist');

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
  });
});
