import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/types';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { ServiceException } from './exceptions/ServiceException';
import { UserUpdateRequest } from '../requests/UserUpdateRequest';

interface UserCreateRequest {
  name: string;
  adminStatus: boolean;
}

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
      adminStatus: request.adminStatus
    });

    if (existingUser) {
      throw new ServiceException('The user already exists');
    }

    await this.userRepository.insert({
      name: request.name,
      adminStatus: request.adminStatus
    });
  }

  async update(id: string, request: UserUpdateRequest) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new ServiceException('The user not exists');
    }

    await this.userRepository.update(id, {
      name: request.name,
      adminStatus: request.adminStatus
    });
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}
