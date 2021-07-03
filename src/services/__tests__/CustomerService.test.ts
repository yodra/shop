import { CustomerService } from '../CustomerService';
import { initializeContainer } from '../../configurations/ioc';
import { TYPES } from '../../constants/types';

const customerRepositoryMock = {
  findAll: jest.fn()
};

describe('CustomerService', () => {
  it('should return a Customer list', async function () {
    customerRepositoryMock.findAll.mockReturnValue([{
      id: 'aId',
      name: 'aName',
      lastName: 'aLastName',
      image: 'aUrlImage'
    }]);
    const container = initializeContainer();
    container.unbind(TYPES.CustomerRepository);
    container.bind(TYPES.CustomerRepository).toConstantValue(customerRepositoryMock);
    const customerService = container.get<CustomerService>(TYPES.CustomerService);

    expect(await customerService.getCustomers()).toEqual([{
      id: 'aId',
      name: 'aName',
      lastName: 'aLastName',
      image: 'aUrlImage'
    }]);
  });
});
