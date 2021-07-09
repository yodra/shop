import { controller, httpGet, httpPost, interfaces, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserService } from '../services/UserService';
import { TYPES } from '../constants/types';
import { User } from '../models/User';
import { assertBodyHasSeveralFields } from './utils/assertions';

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
}
