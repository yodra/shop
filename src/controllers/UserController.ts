import { controller, httpGet, httpPost, httpPut, interfaces, requestBody, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserService } from '../services/UserService';
import { TYPES } from '../constants/types';
import { User } from '../models/User';
import { assertBodyHasSeveralFields, assertObjectId } from './utils/assertions';

@controller('/user')
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
  }

  @httpGet('/')
  async getAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @httpPost('/')
  async create(@requestBody() body: any) {
    assertBodyHasSeveralFields(body, ['name', 'adminStatus']);

    await this.userService.create({
      name: body.name,
      adminStatus: body.adminStatus
    });
  }

  @httpPut('/:id')
  async update(@requestParam('id') id: string, @requestBody() body: any) {
    assertObjectId(id);
    assertBodyHasSeveralFields(body, ['name', 'adminStatus']);

    this.userService.update(id, {
      name: body.name,
      adminStatus: body.adminStatus
    });
  }
}
