import { removeUndefinedValues } from '../utils/objectUtils';
import { ModelId } from '../models/Base';

export class CustomerUpdateRequest {
  public readonly name: string;
  public readonly lastname: string;
  public readonly lastUpdatedBy: ModelId;

  private constructor(name: string, lastname: string, lastUpdatedBy: ModelId) {
    this.name = name;
    this.lastname = lastname;
    this.lastUpdatedBy = lastUpdatedBy;
  }

  static build(body: any, userId: ModelId): CustomerUpdateRequest {
    const request = new CustomerUpdateRequest(body.name, body.lastname, userId);
    removeUndefinedValues(request);
    return request;
  }
}
