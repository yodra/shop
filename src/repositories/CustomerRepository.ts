import { injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { BaseRepository } from './BaseRepository';

@injectable()
export class CustomerRepository extends BaseRepository<Customer> {

  constructor() {
    super('customers');
  }

  findAll(): Promise<Customer[]> {
    return this.find({});
  }

  insert(customer: Partial<Customer>) {
    return this.insertOne(customer);
  }

  async update(id: string, customer: Partial<Customer>) {
    await this.updateOne(id, customer);
  }

}
