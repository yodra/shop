import { inject, injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { TYPES } from '../constants/types';
import { CustomerRepository } from '../repositories/CustomerRepository';

interface CreateCustomerRequest {
  name: string;
  lastname: string;
}

@injectable()
export class CustomerService {

  constructor(@inject(TYPES.CustomerRepository) private customerRepository: CustomerRepository) {
  }

  async getCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async createCustomer(request: CreateCustomerRequest) {
    const existingCustomer = await this.customerRepository.findOne({ name: request, lastname: request.lastname });
    if (existingCustomer) {
      throw new Error('The customer already exists');
    }

    this.customerRepository.insert();
  }
}
