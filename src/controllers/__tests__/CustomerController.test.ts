import { initializeContainer } from '../../configurations/ioc';
import { getTestServer } from '../../../config/jest/after';
import request from 'supertest';

describe('CustomerController', () => {
  describe('getCustomers', () => {
    it('should to get status response 200', async () => {
      const container = initializeContainer();
      const server = await getTestServer(container);
      await request(server)
        .get('/customer')
        .expect(200);
    });
  });
});
