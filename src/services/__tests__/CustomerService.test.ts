import { CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';

const customerRepositoryMock: Partial<CustomerRepository> = {
  findAll: () => Promise.resolve([]),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn()
};

describe('CustomerService', () => {
  const customerService = new CustomerService(customerRepositoryMock as any);

  describe('getCustomers', () => {
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

  describe('createCustomer', () => {
    beforeEach(() => {
      customerRepositoryMock.findOne = jest.fn();
    });

    it('should returns an exception when the customer already exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await expect(customerService.createCustomer({ name: 'Ana', lastname: 'Morales' }))
        .rejects
        .toThrowError('The customer already exists');
    });

    it('should call to insert on CustomerRepository', async () => {
      await customerService.createCustomer({ name: 'Ana', lastname: 'Morales' });

      expect(customerRepositoryMock.insert).toBeCalled();
    });
  });

  describe('removeCustomer', () => {
    it('should call to delete on CustomerRepository', async function () {
      await customerService.removeCustomer('irrelevant');

      expect(customerRepositoryMock.delete).toBeCalled();
    });
  });

  describe('updateCustomer', () => {
    const baseCustomer = { name: 'Ana', lastname: 'Morales' };

    beforeEach(() => {
      customerRepositoryMock.update = jest.fn();
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});
    });

    xit('should returns an exception when the customer not exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await expect(customerService.updateCustomer('1', baseCustomer))
        .rejects
        .toThrowError('The customer not exists');
    });

    it('should call to update on CustomerRepository', async () => {
      await customerService.updateCustomer('1', baseCustomer);

      expect(customerRepositoryMock.update).toBeCalled();
    });
  });

});
