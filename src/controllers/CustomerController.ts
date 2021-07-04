import { controller, httpGet, httpPost, interfaces, requestBody } from 'inversify-express-utils';
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
    await this.customerService.createCustomer({} as any);
  }
}
