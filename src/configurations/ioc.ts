import { Container } from 'inversify';
import { UserService } from '../services/UserService';
import { TYPES } from '../constants/types';
import { UserRepository } from '../repositories/UserRepository';
import { CustomerService } from '../services/CustomerService';
import { CustomerRepository } from '../repositories/CustomerRepository';

export const initializeContainer = (): Container => {
  const container = new Container();
  container.bind<UserService>(TYPES.UserService).to(UserService);
  container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  container.bind<CustomerService>(TYPES.CustomerService).to(CustomerService);
  container.bind<CustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
  return container;
};
