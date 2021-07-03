import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { injectable } from 'inversify';

@injectable()
export class CustomerService {
}

@controller('/customer')
export class CustomerController implements interfaces.Controller {

  @httpGet('/')
  async getCustomers(): Promise<[]> {
    return [];
  }
}
