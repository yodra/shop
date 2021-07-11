import { ControllerClientException } from '../exceptions/ControllerClientException';
import { ObjectId } from 'mongodb';

export const assertBodyHasSeveralFields = (body: any, fields: string[]) => {
  fields.forEach(field => {
    if (body[field] === undefined) {
      throw new ControllerClientException(`The ${field} is mandatory`);
    }
  });
};

export const assertObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new ControllerClientException('The id is not correct!');
  }
};

export const assertRequestHasFiles = (files: any) => {
  if (!files) {
    throw new ControllerClientException('The photo is mandatory');
  }
};

export const assertIsPhoto = (photo: any) => {
  if (photo.mimetype !== 'image/png' && photo.mimetype !== 'image/jpg') {
    throw new ControllerClientException('The type of photo is invalid');
  }
};
