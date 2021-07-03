import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { CustomerService } from '../services/CustomerService';

@controller('/customer')
export class CustomerController implements interfaces.Controller {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {
  }

  @httpGet('/')
  async getCustomers(): Promise<any> {
    return this.customerService.getCustomers();
  }
}
