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
import { assertBodyHasSeveralFields, assertObjectId } from './utils/assertions';
import { toResponseList, UserResponse } from '../responses/UserResponse';

@controller('/user', TYPES.OnlyAdmin)
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
  }

  @httpGet('/')
  async getAll(): Promise<UserResponse[]> {
    const users = await this.userService.getUsers();
    return toResponseList(users);
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
    assertBodyHasSeveralFields(body, ['name']);
    await this.userService.update(id, { name: body.name });
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
