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
});
