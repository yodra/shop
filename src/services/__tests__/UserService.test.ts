import { UserService } from '../UserService';
import { UserRepository } from '../../repositories/UserRepository';

const userRepositoryMock: Partial<UserRepository> = {
  findOne: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  findById: jest.fn()
};

describe('UserService', () => {
  const userService = new UserService(userRepositoryMock as any);
  const baseUser = { name: 'Lucia', adminStatus: false };

  describe('create', () => {
    it('should call to findOne on UserRepository', async () => {
      await userService.create(baseUser);

      expect(userRepositoryMock.findOne).toBeCalledWith(baseUser);
    });

    it('should return an exception when the user already exist', async () => {
      userRepositoryMock.findOne = jest.fn().mockReturnValue({});

      await expect(userService.create({ name: 'Lucia', adminStatus: false }))
        .rejects
        .toThrowError('The user already exists');
    });

    it('should call to insert on UserRepository', async () => {
      userRepositoryMock.findOne = jest.fn().mockReturnValue(undefined);

      await userService.create(baseUser);

      expect(userRepositoryMock.insert).toBeCalledWith(baseUser);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      userRepositoryMock.update = jest.fn();
      userRepositoryMock.findById = jest.fn().mockReturnValue({});
    });

    it('should returns an exception when the user not exist', async () => {
      userRepositoryMock.findById = jest.fn().mockReturnValue(undefined);

      await expect(userService.update('1', baseUser))
        .rejects
        .toThrowError('The user not exists');
    });

    it('should call to update on UserRepository', async () => {
      await userService.update('1', baseUser);

      expect(userRepositoryMock.update).toBeCalled();
    });
  });
});
