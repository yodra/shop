import { inject, injectable } from 'inversify';
import { Customer } from '../models/Customer';
import { TYPES } from '../constants/types';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { ServiceException } from './exceptions/ServiceException';
import { CustomerUpdateRequest } from '../requests/CustomerUpdateRequest';
import { ReadStream } from 'fs';
import { S3Service } from './S3Service';
import { CustomerCreateRequest } from '../requests/CustomerCreateRequest';

@injectable()
export class CustomerService {

  constructor(@inject(TYPES.CustomerRepository) private customerRepository: CustomerRepository,
    @inject(TYPES.S3Service) private s3Service: S3Service) {
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getCustomer(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ id });

    if (!customer) {
      throw new ServiceException('The customer not exists');
    }

    return customer;
  }

  async createCustomer(request: CustomerCreateRequest) {
    const existingCustomer = await this.customerRepository.findOne({
      id: request.id
    });

    if (existingCustomer) {
      throw new ServiceException('The customer already exists');
    }

    await this.customerRepository.insert({ ...request });
  }

  async updateCustomer(id: string, request: CustomerUpdateRequest) {
    const existingCustomer = await this.customerRepository.findOne({ id });

    if (!existingCustomer) {
      throw new ServiceException('The customer not exists');
    }

    await this.customerRepository.update(existingCustomer._id, { ...request });
  }

  async removeCustomer(id: string) {
    const customer = await this.customerRepository.findOne({ id });
    if (customer) {
      await this.customerRepository.deleteOne(customer._id);
    }
  }

  async uploadPhoto(id: string, photo: ReadStream) {
    const existingCustomer = await this.customerRepository.findOne({ id });

    if (!existingCustomer) {
      throw new ServiceException('The customer not exists');
    }

    const photoKey = await this.s3Service.upload(`customers/${existingCustomer._id}`, photo);
    await this.customerRepository.update(existingCustomer._id, { photo: photoKey });
  }
}
