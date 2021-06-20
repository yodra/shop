import { injectable } from "inversify";

@injectable()
export class UserService {
  getUsers() {
    return "Hello Service!";
  }
}
