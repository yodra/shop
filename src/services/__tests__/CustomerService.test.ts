import { CustomerService } from '../CustomerService';
import { CustomerRepository } from '../../repositories/CustomerRepository';
import { CustomerUpdateRequest } from '../../requests/CustomerUpdateRequest';
import { CustomerCreateRequest } from '../../requests/CustomerCreateRequest';

const customerRepositoryMock: Partial<CustomerRepository> = {
  findAll: () => Promise.resolve([]),
  insert: jest.fn(),
  deleteOne: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn()
};

describe('CustomerService', () => {
  const customerService = new CustomerService(customerRepositoryMock as any, {} as any);

  describe('getAll', () => {
    it('should return a Customer list', async function () {
      const date = new Date();
      customerRepositoryMock.findAll = () => Promise.resolve([{
        _id: 'mongoId',
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aUrlImage',
        createdAt: date,
        lastUpdatedAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }, {
        _id: 'mongoId2',
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname',
        createdAt: date,
        lastUpdatedAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }]);

      expect(await customerService.getAll()).toEqual([{
        _id: 'mongoId',
        id: 'aId1',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aUrlImage',
        createdAt: date,
        lastUpdatedAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }, {
        _id: 'mongoId2',
        id: 'aId2',
        name: 'aName',
        lastname: 'aLastname',
        createdAt: date,
        lastUpdatedAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      }]);
    });
  });

  describe('get', () => {
    it('should return a customer', async function () {
      const date = new Date();
      customerRepositoryMock.findOne = () => {
        return Promise.resolve({
          _id: 'mongoId',
          id: '1',
          name: 'aName',
          lastname: 'aLastname',
          photo: 'aUrlImage',
          createdAt: date,
          lastUpdatedAt: date,
          createdBy: '551137c2f9e1fac808a5f572'
        });
      };

      expect(await customerService.get('1')).toEqual({
        _id: 'mongoId',
        id: '1',
        name: 'aName',
        lastname: 'aLastname',
        photo: 'aUrlImage',
        createdAt: date,
        lastUpdatedAt: date,
        createdBy: '551137c2f9e1fac808a5f572'
      });
    });

    it('should returns an exception when the customer not exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await expect(customerService.get('1'))
        .rejects
        .toThrowError('The customer not exists');
    });
  });

  describe('create', () => {
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
      await customerService.create(createRequest);

      expect(customerRepositoryMock.findOne).toBeCalledWith({ id: 'businessId' });
    });

    it('should returns an exception when the customer already exist', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await expect(customerService.create(createRequest))
        .rejects
        .toThrowError('The customer already exists');
    });

    it('should call to insert on CustomerRepository', async () => {
      await customerService.create(createRequest);

      expect(customerRepositoryMock.insert).toBeCalled();
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      customerRepositoryMock.deleteOne = jest.fn();
    });

    it('should remove a Customer if exists', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({ _id: '1' });

      await customerService.remove('businessId');

      expect(customerRepositoryMock.deleteOne).toBeCalledWith('1');
    });

    it('should not remove a Customer if not exists', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await customerService.remove('businessId');

      expect(customerRepositoryMock.deleteOne).not.toBeCalled();
    });
  });

  describe('update', () => {
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

      await expect(customerService.update('1', updateRequest))
        .rejects
        .toThrowError('The customer not exists');
    });

    it('should update the customer when exists', async () => {
      customerRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await customerService.update('1', updateRequest);

      expect(customerRepositoryMock.update).toBeCalled();
    });
  });
});
