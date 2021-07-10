import { inject, injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { TYPES } from '../constants/types';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { ServiceException } from './exceptions/ServiceException';
import { CustomerUpdateRequest } from '../requests/CustomerUpdateRequest';

export interface CustomerCreateRequest {
  businessId: string;
  name: string;
  lastname: string;
}

@injectable()
export class CustomerService {

  constructor(@inject(TYPES.CustomerRepository) private customerRepository: CustomerRepository) {
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getCustomer(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new ServiceException('The customer not exists');
    }

    return customer;
  }

  async createCustomer(request: CustomerCreateRequest) {
    const existingCustomer = await this.customerRepository.findOne({
      businessId: request.businessId,
      name: request.name,
      lastname: request.lastname
    });

    if (existingCustomer) {
      throw new ServiceException('The customer already exists');
    }

    await this.customerRepository.insert({
      id: request.businessId,
      name: request.name,
      lastname: request.lastname
    });
  }

  async updateCustomer(id: string, request: CustomerUpdateRequest) {
    const existingCustomer = await this.customerRepository.findById(id);

    if (!existingCustomer) {
      throw new ServiceException('The customer not exists');
    }

    await this.customerRepository.update(id, {
      name: request.name,
      lastname: request.lastname
    });
  }

  async removeCustomer(id: string) {
    await this.customerRepository.delete(id);
  }

}
