import { CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';

const customerRepositoryMock: Partial<CustomerRepository> = {
  findAll: () => Promise.resolve([])
};

describe('CustomerService', () => {
  const customerService = new CustomerService(customerRepositoryMock as any);

  it('should return a Customer list', async function () {
    customerRepositoryMock.findAll = () => Promise.resolve([{
      id: 'aId',
      name: 'aName',
      lastname: 'aLastname',
      image: 'aUrlImage'
    }]);

    expect(await customerService.getCustomers()).toEqual([{
      id: 'aId',
      name: 'aName',
      lastname: 'aLastname',
      image: 'aUrlImage'
    }]);
  });
});
