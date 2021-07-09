import { injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { BaseRepository } from './BaseRepository';
import { ObjectId } from 'mongodb';

@injectable()
export class CustomerRepository extends BaseRepository<Customer> {

  constructor() {
    super('customers');
  }

  findAll(): Promise<Customer[]> {
    return this.find({});
  }

  findById(id: string): Promise<Customer> {
    return this.findOne({ _id: new ObjectId(id) });
  }

  insert(customer: Partial<Customer>) {
    return this.insertOne(customer);
  }

  async update(id: string, customer: Partial<Customer>) {
    await this.updateOne(id, customer);
  }

  async delete(id) {
    await this.deleteOne(id);
  }
}
