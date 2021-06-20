import { injectable } from "inversify";

@injectable()
export class UserRepository {
  getUsers() {
    return "Hello Repository!"
  }
}
