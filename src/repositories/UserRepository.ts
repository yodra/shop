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

  insert(user: Partial<User>) {
    return this.insertOne(user);
  }

  async update(id: string, user: Partial<User>) {
    await this.updateOne(id, user);
  }

  async delete(id) {
    await this.deleteOne(id);
  }
}
