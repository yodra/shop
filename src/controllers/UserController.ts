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
import { UserService } from '../services/UserService';
import { TYPES } from '../constants/types';
import { User } from '../models/User';
import { assertBodyHasSeveralFields, assertObjectId } from './utils/assertions';
import { UserUpdateRequest } from '../requests/UserUpdateRequest';

@controller('/user', TYPES.OnlyAdmin)
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
  }

  @httpGet('/')
  async getAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @httpPost('/')
  async create(@requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['name', 'isAdmin']);

    await this.userService.create({
      name: body.name,
      isAdmin: body.isAdmin
    });
  }

  @httpPut('/:id')
  async update(@requestParam('id') id: string, @requestBody() body: any) {
    assertObjectId(id);
    assertBodyHasSeveralFields(body, ['name', 'isAdmin']);
    await this.userService.update(id, UserUpdateRequest.build(body));
  }

  @httpDelete('/:id')
  async remove(@requestParam('id') id: string) {
    assertObjectId(id);
    await this.userService.remove(id);
  }

  @httpPut('/admin/:id')
  async changeAdminStatus(@requestParam('id') id: string, @requestBody() body: any) {
    assertObjectId(id);
    assertBodyHasSeveralFields(body, ['isAdmin']);
    await this.userService.changeAdminStatus(id, { isAdmin: body.isAdmin });
  }
}
