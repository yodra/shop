export class UpdateCustomerRequest {
  public readonly name: string;
  public readonly lastname: string;

  private constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }

  static build(body: any): UpdateCustomerRequest {
    const request = new UpdateCustomerRequest(body.name, body.lastname);
    Object.keys(request).forEach(key => request[key] === undefined ? delete request[key] : {});
    return request;
  }
}
