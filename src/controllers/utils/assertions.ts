import { ControllerClientException } from '../exceptions/ControllerClientException';

export const assertBodyHasSeveralFields = (body: any, fields: string[]) => {
  fields.forEach(field => {
    if (!body[field]) {
      throw new ControllerClientException(`The ${field} is mandatory`);
    }
  });
};
