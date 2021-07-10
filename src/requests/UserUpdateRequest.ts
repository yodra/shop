import { removeUndefinedValues } from '../utils/objectUtils';

export class UserUpdateRequest {
  public readonly name: string;
  public readonly isAdmin: boolean;

  private constructor(name: string, isAdmin: boolean) {
    this.name = name;
    this.isAdmin = isAdmin;
  }

  static build(body: any): UserUpdateRequest {
    const request = new UserUpdateRequest(body.name, body.isAdmin);
    return removeUndefinedValues(request);
  }
}
