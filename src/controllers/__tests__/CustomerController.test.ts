import { initializeContainer } from '../../configurations/ioc';
import { getTestServer } from '../../../config/jest/after';
import request from 'supertest';

let server;

describe('CustomerController', () => {
  beforeAll(async () => {
    const container = initializeContainer();
    server = await getTestServer(container);
  });

  describe('getCustomers', () => {
    it('should to get status response 200', async () => {
      const expectedBody = [];
      await request(server)
        .get('/customer')
        .expect(200)
        .expect(expectedBody);
    });
  });
});
