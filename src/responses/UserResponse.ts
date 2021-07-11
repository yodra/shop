import { User } from '../models/User';

export interface UserResponse {
  id: string;
  name: string;
  isAdmin: boolean;
}

const toResponse = (user: User): UserResponse => ({
  id: user._id,
  name: user.name,
  isAdmin: user.isAdmin
});

export const toResponseList = (users: User[]): UserResponse[] =>
  users.map(toResponse);

