import { Config } from '../configurations/Config';
import { Customer } from '../models/Customer';

export interface CustomerResponse {
  id: string;
  name: string;
  lastname: string;
  photo?: string;
  createdBy: string;
  updatedBy?: string;
}

const toPublicUrl = (photo?: string): string | undefined =>
  photo && `${Config.aws.s3Bucket}.s3.${Config.aws.region}.amazonaws.com/${photo}`;

export const toResponse = (customer: Customer): CustomerResponse => ({
  id: customer.id,
  name: customer.name,
  lastname: customer.lastname,
  photo: toPublicUrl(customer.photo),
  createdBy: customer.createdBy,
  updatedBy: customer.updatedBy
});

export const toResponseList = (customers: Customer[]): CustomerResponse[] =>
  customers.map(toResponse);

