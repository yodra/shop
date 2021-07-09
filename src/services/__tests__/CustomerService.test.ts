import { CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';

const customerRepositoryMock: Partial<CustomerRepository> = {
  findAll: () => Promise.resolve([]),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn()
};

describe('CustomerService', () => {
  const customerService = new CustomerService(customerRepositoryMock as any);

  describe('getAllCustomers', () => {
    it('should return a Customer list', async function () {
      customerRepositoryMock.findAll = () => Promise.resolve([{
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage'
      }, {
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname'
      }]);

      expect(await customerService.getAllCustomers()).toEqual([{
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage'
      }, {
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname'
      }]);
    });
  });

  describe('getCustomer', () => {
    it('should return a Customer', async function () {
      customerRepositoryMock.findById = () => Promise.resolve({
        id: '1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage'
      });

      expect(await customerService.getCustomer('1')).toEqual({
        id: '1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage'
      });
    });

    it('should returns an exception when the customer not exist', async () => {
      customerRepositoryMock.findById = jest.fn().mockReturnValue(undefined);

      await expect(customerService.getCustomer('1'))
        .rejects
        .toThrowError('The customer not exists');
    });
  });

  describe('createCustomer', () => {
    beforeEach(() => {
      customerRepositoryMock.findOne = jest.fn();
    });

    it('should call to findOne on CustomerRepository', async () => {
      await customerService.createCustomer({ name: 'Ana', lastname: 'Morales' });

      expect(customerRepositoryMock.findOne).toBeCalledWith({ name: 'Ana', lastname: 'Morales' });
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
      customerRepositoryMock.findById = jest.fn().mockReturnValue({});
    });

    it('should returns an exception when the customer not exist', async () => {
      customerRepositoryMock.findById = jest.fn().mockReturnValue(undefined);

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
