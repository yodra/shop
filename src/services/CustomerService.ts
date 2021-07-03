import { injectable } from 'inversify';

@injectable()
export class CustomerService {
  async getCustomers(): Promise<any> {
    return [];
  }
}
