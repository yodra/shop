export const removeUndefinedValues = (request) => {
  Object.keys(request).forEach(key => request[key] === undefined ? delete request[key] : {});
};

export class UserUpdateRequest {
  public readonly name: string;
  public readonly adminStatus: boolean;


  private constructor(name: string, adminStatus: boolean) {
    this.name = name;
    this.adminStatus = adminStatus;
  }

  static build(body: any): UserUpdateRequest {
    const request = new UserUpdateRequest(body.name, body.adminStatus);
    removeUndefinedValues(request);
    return request;
  }
}
