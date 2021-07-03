import { CustomerService } from '../CustomerService';

describe('CustomerService', () => {
  it('should return a Customer list', async function () {
    const customerService = new CustomerService();
    expect(await customerService.getCustomers()).toEqual([]);
  });
});
