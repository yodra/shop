import { ControllerClientException } from '../exceptions/ControllerClientException';

export const assertBody = (body: any, field: string, message?: string) => {
  if (!body[field]) {
    throw new ControllerClientException(message || `${field} is mandatory`);
  }
};
