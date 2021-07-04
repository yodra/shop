// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { controller, httpGet, httpPost, interfaces, requestBody, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import express from 'express';

@controller('/customer')
export class CustomerController implements interfaces.Controller {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {
  }

  @httpGet('/')
  async getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @httpPost('/')
  async createCustomer(@response() response: express.Response, @requestBody() body: any) {
    if (!body.name) {
      response.status(400).json({ error: 'The name of customer is mandatory' });
      return;
    }

    if (!body.lastname) {
      response.status(400).json({ error: 'The lastname of customer is mandatory' });
      return;
    }
  }
}
