import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request,
  requestBody,
  requestParam
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import { assertBodyHasSeveralFields } from './utils/assertions';
import { CustomerUpdateRequest } from '../requests/CustomerUpdateRequest';
import { AuthRequest } from '../configurations/server/middleware/security/utils';

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
  async createCustomer(@request() request: AuthRequest, @requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['id', 'name', 'lastname']);
    const idUserAuth = request.user.id;

    await this.customerService.createCustomer({
      id: body.id,
      name: body.name,
      lastname: body.lastname,
      createdBy: idUserAuth
    });
  }

  @httpPut('/:id')
  async updateCustomer(@request() request: AuthRequest, @requestParam('id') id: string, @requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['name', 'lastname']);
    const idUserAuth = request.user.id;

    await this.customerService.updateCustomer(id, CustomerUpdateRequest.build(body, idUserAuth));
  }

  @httpDelete('/:id')
  async removeCustomer(@requestParam('id') id: string) {
    await this.customerService.removeCustomer(id);
  }

}
