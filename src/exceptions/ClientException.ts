export class ClientException extends Error {
  public readonly httpCode: number;
  
  constructor(message: string, httpCode = 400) {
    super(message);
    this.httpCode = httpCode;
  }
}
