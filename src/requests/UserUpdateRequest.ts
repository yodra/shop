import { removeUndefinedValues } from '../utils/objectUtils';

export class UserUpdateRequest {
  public readonly name: string;
  public readonly adminStatus: boolean;

  private constructor(name: string, adminStatus: boolean) {
    this.name = name;
    this.adminStatus = adminStatus;
  }

  static build(body: any): UserUpdateRequest {
    const request = new UserUpdateRequest(body.name, body.adminStatus);
    return removeUndefinedValues(request);
  }
}
