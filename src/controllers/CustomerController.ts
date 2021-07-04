import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  requestBody,
  requestParam
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import { assertBody } from './utils/assertions';

@controller('/customer')
export class CustomerController implements interfaces.Controller {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {
  }

  @httpGet('/')
  async getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @httpPost('/')
  async createCustomer(@requestBody() body: any) {
    assertBody(body, 'name', 'The name of customer is mandatory');
    assertBody(body, 'lastname', 'The lastname of customer is mandatory');

    // TODO: Extract from session the userId
    await this.customerService.createCustomer({
      name: body.name,
      lastname: body.lastname
    });
  }

  @httpDelete('/:id')
  async removeCustomer(@requestParam('id') id: string) {
    // TODO: assertObjectId(id)
    await this.customerService.removeCustomer(id);
  }

  // TODO: UpdateCustomer
}
