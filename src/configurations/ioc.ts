import { Container, ContainerModule, interfaces } from 'inversify';
import { UserService } from '../services/UserService';
import { TYPES } from '../constants/types';
import { UserRepository } from '../repositories/UserRepository';
import { CustomerService } from '../services/CustomerService';
import { CustomerRepository } from '../repositories/CustomerRepository';

export const initializeContainer = (): Container => {
  const container = new Container();
  container.load(
    initializeServicesContainer(),
    initializeRepositoriesContainer()
  );
  return container;
};

export const initializeServicesContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<UserService>(TYPES.UserService).to(UserService);
  bind<CustomerService>(TYPES.CustomerService).to(CustomerService);
});

const initializeRepositoriesContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  bind<CustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
});
