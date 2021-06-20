import { injectable } from "inversify";
import { User } from "../models/User";

@injectable()
export class UserRepository {
  findAll(): Promise<User[]> {
    return Promise.resolve([{
      id: '1234',
      name: 'name',
      surname: 'surname'
    }])
  }
}
