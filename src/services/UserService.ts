import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types";
import { UserRepository } from "../repositories/UserRepository";

@injectable()
export class UserService {

  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {
  }

  getUsers() {
    return this.userRepository.getUsers();
  }
}
