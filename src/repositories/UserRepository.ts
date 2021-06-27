import { injectable } from 'inversify';
import { User } from '../models/User';
import { BaseRepository } from './BaseRepository';

@injectable()
export class UserRepository extends BaseRepository<User> {

  constructor() {
    super('users');
  }

  findAll(): Promise<User[]> {
    return this.find({});
  }
}
