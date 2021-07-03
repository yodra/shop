import { CustomerService } from '../CustomerService';

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
    const customerService = new CustomerService(customerRepositoryMock);

    expect(await customerService.getCustomers()).toEqual([{
      id: 'aId',
      name: 'aName',
      lastName: 'aLastName',
      image: 'aUrlImage'
    }]);
  });
});
