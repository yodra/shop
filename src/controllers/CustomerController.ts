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
import { assertBodyHasSeveralFields } from './utils/assertions';
import { CustomerUpdateRequest } from '../requests/CustomerUpdateRequest';
import { AuthRequest } from '../configurations/server/middleware/security/utils';
import fs from 'fs';
import { CustomerResponse, toResponse, toResponseList } from '../responses/CustomerResponse';

@controller('/customer', TYPES.Authentication)
export class CustomerController implements interfaces.Controller {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {
  }

  @httpGet('/')
  async getAllCustomers(): Promise<CustomerResponse[]> {
    const allCustomers = await this.customerService.getAllCustomers();
    return toResponseList(allCustomers);
  }

  @httpGet('/:id')
  async getCustomer(@requestParam('id') id: string): Promise<CustomerResponse> {
    const customer = await this.customerService.getCustomer(id);
    return toResponse(customer);
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

  @httpPut('/photo/:id')
  async addPhoto(@requestParam('id') id: string, @request() request: any) {
    // TODO assertHasFile()
    // TODO assertIsPhoto() png, jpeg
    const photo = fs.createReadStream(request.files.file.tempFilePath);
    await this.customerService.uploadPhoto(id, photo);
  }
}
