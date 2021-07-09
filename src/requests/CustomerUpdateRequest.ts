import { removeUndefinedValues } from '../utils/objectUtils';

export class CustomerUpdateRequest {
  public readonly name: string;
  public readonly lastname: string;

  private constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }

  static build(body: any): CustomerUpdateRequest {
    const request = new CustomerUpdateRequest(body.name, body.lastname);
    removeUndefinedValues(request);
    return request;
  }
}
