import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/types';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { ServiceException } from './exceptions/ServiceException';
import { UserUpdateRequest } from '../requests/UserUpdateRequest';
import { UserCreateRequest } from '../requests/UserCreateRequest';
import { ChangeAdminStatusRequest } from '../requests/ChangeAdminStatusRequest';

@injectable()
export class UserService {

  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(request: UserCreateRequest) {
    const existingUser = await this.userRepository.findOne({
      name: request.name,
      isAdmin: request.isAdmin
    });

    if (existingUser) {
      throw new ServiceException('The user already exists');
    }

    await this.userRepository.insert({
      name: request.name,
      isAdmin: request.isAdmin
    });
  }

  async update(id: string, request: UserUpdateRequest) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new ServiceException('The user not exists');
    }

    await this.userRepository.update(id, { name: request.name });
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

  async changeAdminStatus(id: string, request: ChangeAdminStatusRequest) {
    await this.userRepository.updateOne(id, { ...request });
  }
}
