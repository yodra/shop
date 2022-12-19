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
import { assertBodyHasSeveralFields, assertIsPhoto, assertRequestHasFiles } from './utils/assertions';
import { CustomerUpdateRequest } from '../requests/CustomerUpdateRequest';
import { AuthRequest } from '../configurations/server/middleware/security/utils';
import { CustomerResponse, toResponse, toResponseList } from '../responses/CustomerResponse';
import * as fs from 'fs';

@controller('/customer', TYPES.Authentication)
export class CustomerController implements interfaces.Controller {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {
  }

  @httpGet('/')
  async getAll(): Promise<CustomerResponse[]> {
    const allCustomers = await this.customerService.getAll();
    return toResponseList(allCustomers);
  }

  @httpGet('/:id')
  async get(@requestParam('id') id: string): Promise<CustomerResponse> {
    const customer = await this.customerService.get(id);
    return toResponse(customer);
  }

  @httpPost('/')
  async create(@request() request: AuthRequest, @requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['id', 'name', 'lastname']);
    // TODO: Maybe this is responsibility of the @auth middleware
    const idUserAuth = request.user.id;

    await this.customerService.create({
      id: body.id,
      name: body.name,
      lastname: body.lastname,
      createdBy: idUserAuth
    });
  }

  @httpPut('/:id')
  async update(@request() request: AuthRequest, @requestParam('id') id: string, @requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['name', 'lastname']);
    const idUserAuth = request.user.id;

    await this.customerService.update(id, CustomerUpdateRequest.build(body, idUserAuth));
  }

  @httpDelete('/:id')
  async remove(@requestParam('id') id: string) {
    await this.customerService.remove(id);
  }

  @httpPut('/photo/:id')
  async addPhoto(@requestParam('id') id: string, @request() request: any) {
    assertRequestHasFiles(request.files);
    assertIsPhoto(request.files.photo);
    const photo = fs.createReadStream(request.files.photo.tempFilePath);
    await this.customerService.uploadPhoto(id, photo);
  }
}
