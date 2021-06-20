import { controller, httpGet, interfaces } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "../services/UserService";
import { TYPES } from "../constants/types";

@controller('/user')
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
  }

  @httpGet("/")
  getUsers(): string {
    return this.userService.getUsers();
  };

}
