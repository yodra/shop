import { injectable } from 'inversify';
import { Customer } from '../models/Customer';

@injectable()
export class CustomerService {
  async getCustomers(): Promise<Customer[]> {
    return [];
  }
}
