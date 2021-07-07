import { inject, injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { TYPES } from '../constants/types';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { ServiceException } from './exceptions/ServiceException';
import { UpdateCustomerRequest } from '../requests/UpdateCustomerRequest';

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
    const existingCustomer = await this.customerRepository.findOne({
      name: request.name,
      lastname: request.lastname
    });

    if (existingCustomer) {
      throw new ServiceException('The customer already exists');
    }

    await this.customerRepository.insert({
      name: request.name,
      lastname: request.lastname
    });
  }

  async removeCustomer(id: string) {
    await this.customerRepository.delete(id);
  }

  async updateCustomer(id: string, request: UpdateCustomerRequest) {
    const existingCustomer = await this.customerRepository.findOne({
      name: request.name,
      lastname: request.lastname
    });

    if (!existingCustomer) {
      throw new ServiceException('The customer not exists');
    }

    await this.customerRepository.update(id, {
      name: request.name,
      lastname: request.lastname
    });
  }
}
