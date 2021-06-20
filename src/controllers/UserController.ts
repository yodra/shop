import { controller, httpGet, interfaces } from "inversify-express-utils";

@controller('/user')
export class UserController implements interfaces.Controller {

  constructor() {
  }

  @httpGet("/")
  getUsers(): string {
    return "Hello world!"
  };

}
