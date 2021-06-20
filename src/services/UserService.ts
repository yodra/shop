import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";

@injectable()
export class UserService {

  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
