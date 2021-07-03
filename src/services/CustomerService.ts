import { inject, injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { TYPES } from '../constants/types';
import { CustomerRepository } from '../repositories/CustomerRepository';

@injectable()
export class CustomerService {

  constructor(@inject(TYPES.CustomerRepository) private customerRepository: CustomerRepository) {
  }

  async getCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}
