import { controller, httpGet, interfaces } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "../services/UserService";
import { TYPES } from "../constants/types";
import { User } from "../models/User";

@controller('/user')
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
  }

  @httpGet('/')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  };

}
