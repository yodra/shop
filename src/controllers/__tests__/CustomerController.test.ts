import { initializeContainer } from '../../configurations/ioc';
import { getTestServer } from '../../../config/jest/after';
import request from 'supertest';
import { Customer } from '../../models/Customer';
import { TYPES } from '../../constants/types';

let server;
const customerServiceMock = {
  getCustomers: jest.fn()
};

describe('CustomerController', () => {
  beforeAll(async () => {
    const container = initializeContainer();
    container.unbind(TYPES.CustomerService);
    container.bind(TYPES.CustomerService).toConstantValue(customerServiceMock);
    server = await getTestServer(container);
  });

  describe('getCustomers', () => {
    it('should to get status response 200', async () => {
      customerServiceMock.getCustomers.mockReturnValue([{
        id: 'anId',
        name: 'aName',
        lastName: 'aLastName',
        image: 'aUrlImage'
      }]);

      const expectedBody: Customer[] = [{
        id: 'anId',
        name: 'aName',
        lastName: 'aLastName',
        image: 'aUrlImage'
      }];
      await request(server)
        .get('/customer')
        .expect(200)
        .expect(expectedBody);
    });
  });
});
