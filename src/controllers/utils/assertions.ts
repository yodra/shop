import { ControllerClientException } from '../exceptions/ControllerClientException';
import { ObjectId } from 'mongodb';

export const assertBodyHasSeveralFields = (body: any, fields: string[]) => {
  fields.forEach(field => {
    if (!body[field]) {
      throw new ControllerClientException(`The ${field} is mandatory`);
    }
  });
};

export const assertObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new ControllerClientException('The id is not correct!');
  }
};
