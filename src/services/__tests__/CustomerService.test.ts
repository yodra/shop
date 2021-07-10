import { CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';

const customerRepositoryMock: Partial<CustomerRepository> = {
  findAll: () => Promise.resolve([]),
  insert: jest.fn(),
  deleteOne: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn()
};

describe('CustomerService', () => {
  const customerService = new CustomerService(customerRepositoryMock as any);

  describe('getAllCustomers', () => {
    it('should return a Customer list', async function () {
      const date = new Date();
      customerRepositoryMock.findAll = () => Promise.resolve([{
        _id: 'mongoId',
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage',
        createdAt: date
      }, {
        _id: 'mongoId2',
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname',
        createdAt: date
      }]);

      // TODO: Create Response
      expect(await customerService.getAllCustomers()).toEqual([{
        _id: 'mongoId',
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage',
        createdAt: date
      }, {
        _id: 'mongoId2',
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname',
        createdAt: date
      }]);
    });
  });

  describe('getCustomer', () => {
    // TODO create Response
    it('should return a Customer', async function () {
      const date = new Date();
      customerRepositoryMock.findById = () => {
        return Promise.resolve({
          _id: 'mongoId',
          id: '1',
          name: 'aName',
          lastname: 'aLastname',
          image: 'aUrlImage',
          createdAt: date
        });
      };

      expect(await customerService.getCustomer('1')).toEqual({
        _id: 'mongoId',
        id: '1',
        name: 'aName',
        lastname: 'aLastname',
        image: 'aUrlImage',
        createdAt: date
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
      await customerService.createCustomer({ id: 'businessId', name: 'Ana', lastname: 'Morales' });

      expect(customerRepositoryMock.findOne).toBeCalledWith({
        id: 'businessId',
        name: 'Ana',
        lastname: 'Morales'
      });
    });

    it('should returns an exception when the customer already exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await expect(customerService.createCustomer({ id: 'businessId', name: 'Ana', lastname: 'Morales' }))
        .rejects
        .toThrowError('The customer already exists');
    });

    it('should call to insert on CustomerRepository', async () => {
      await customerService.createCustomer({ id: 'businessId', name: 'Ana', lastname: 'Morales' });

      expect(customerRepositoryMock.insert).toBeCalled();
    });
  });

  describe('removeCustomer', () => {
    beforeEach(() => {
      customerRepositoryMock.deleteOne = jest.fn();
    });

    it('should remove a Customer if exists', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({ _id: '1' });

      await customerService.removeCustomer('businessId');

      expect(customerRepositoryMock.deleteOne).toBeCalledWith('1');
    });

    it('should not remove a Customer if not exists', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await customerService.removeCustomer('businessId');

      expect(customerRepositoryMock.deleteOne).not.toBeCalled();
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
