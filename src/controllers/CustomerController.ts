import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  requestBody,
  requestParam
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import { assertBodyHasSeveralFields } from './utils/assertions';
import { CustomerUpdateRequest } from '../requests/CustomerUpdateRequest';

@controller('/customer', TYPES.Authentication)
export class CustomerController implements interfaces.Controller {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {
  }

  @httpGet('/')
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }

  @httpGet('/:id')
  async getCustomer(@requestParam('id') id: string): Promise<Customer> {
    return this.customerService.getCustomer(id);
  }

  @httpPost('/')
  async createCustomer(@requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['id', 'name', 'lastname']);

    // TODO: Extract from session the userId
    await this.customerService.createCustomer({
      id: body.id,
      name: body.name,
      lastname: body.lastname
    });
  }

  @httpPut('/:id')
  async updateCustomer(@requestParam('id') id: string, @requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['name', 'lastname']);

    // TODO: Extract from session the userId
    const request = CustomerUpdateRequest.build(body);
    await this.customerService.updateCustomer(id, request);
  }

  @httpDelete('/:id')
  async removeCustomer(@requestParam('id') id: string) {
    await this.customerService.removeCustomer(id);
  }

}
