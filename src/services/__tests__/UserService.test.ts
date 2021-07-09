import { UserService } from '../UserService';
import { UserRepository } from '../../repositories/UserRepository';

const userRepositoryMock: Partial<UserRepository> = {
  findOne: jest.fn(),
  insert: jest.fn()
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
      userRepositoryMock.findOne = jest.fn().mockReturnValue({ });

      await expect(userService.create({ name: 'Lucia', adminStatus: false }))
        .rejects
        .toThrowError('The user already exists');
    });

    it('should call to insert on UserRepository', async () => {
      await userService.create(baseUser);

      expect(userRepositoryMock.insert).toBeCalledWith(baseUser);
    });
  });
});
