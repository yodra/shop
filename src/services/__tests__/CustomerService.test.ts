import { CustomerCreateRequest, CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';
import { CustomerUpdateRequest } from '../../requests/CustomerUpdateRequest';

const customerRepositoryMock: Partial<CustomerRepository> = {
  findAll: () => Promise.resolve([]),
  insert: jest.fn(),
  deleteOne: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn()
};

describe('CustomerService', () => {
  const customerService = new CustomerService(customerRepositoryMock as any, {} as any);

  describe('getAllCustomers', () => {
    it('should return a Customer list', async function () {
      const date = new Date();
      customerRepositoryMock.findAll = () => Promise.resolve([{
        _id: 'mongoId',
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aUrlImage',
        createdAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }, {
        _id: 'mongoId2',
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname',
        createdAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }]);

      // TODO: Create Response
      expect(await customerService.getAllCustomers()).toEqual([{
        _id: 'mongoId',
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aUrlImage',
        createdAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }, {
        _id: 'mongoId2',
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname',
        createdAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }]);
    });
  });

  describe('getCustomer', () => {
    // TODO create Response
    it('should return a Customer', async function () {
      const date = new Date();
      customerRepositoryMock.findOne = () => {
        return Promise.resolve({
          _id: 'mongoId',
          id: '1',
          name: 'aName',
          lastname: 'aLastname',
          photo: 'aUrlImage',
          createdAt: date,
          createdBy: '551137c2f9e1fac808a5f572'
        });
      };

      expect(await customerService.getCustomer('1')).toEqual({
        _id: 'mongoId',
        id: '1',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aUrlImage',
        createdAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      });
    });

    it('should returns an exception when the customer not exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await expect(customerService.getCustomer('1'))
        .rejects
        .toThrowError('The customer not exists');
    });
  });

  describe('createCustomer', () => {
    const createRequest: CustomerCreateRequest = {
      id: 'businessId',
      name: 'Ana',
      lastname: 'Morales',
      createdBy: '551137c2f9e1fac808a5f572'
    };

    beforeEach(() => {
      customerRepositoryMock.findOne = jest.fn();
    });

    it('should call to findOne on CustomerRepository', async () => {
      await customerService.createCustomer(createRequest);

      expect(customerRepositoryMock.findOne).toBeCalledWith({ id: 'businessId' });
    });

    it('should returns an exception when the customer already exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await expect(customerService.createCustomer(createRequest))
        .rejects
        .toThrowError('The customer already exists');
    });

    it('should call to insert on CustomerRepository', async () => {
      await customerService.createCustomer(createRequest);

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
    const updateRequest: CustomerUpdateRequest = {
      name: 'Ana',
      lastname: 'Morales',
      lastUpdatedBy: '551137c2f9e1fac808a5f572'
    };

    beforeEach(() => {
      customerRepositoryMock.update = jest.fn();
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});
    });

    it('should returns an exception when the customer not exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await expect(customerService.updateCustomer('1', updateRequest))
        .rejects
        .toThrowError('The customer not exists');
    });

    it('should update the customer when exists', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await customerService.updateCustomer('1', updateRequest);

      expect(customerRepositoryMock.update).toBeCalled();
    });
  });
});
