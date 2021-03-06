import { Container, ContainerModule, interfaces } from 'inversify';
import { UserService } from '../services/UserService';
import { TYPES } from '../constants/types';
import { UserRepository } from '../repositories/UserRepository';
import { CustomerService } from '../services/CustomerService';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { Authentication } from './server/middleware/security/Authentication';
import { OnlyAdmin } from './server/middleware/security/OnlyAdmin';
import { S3Service } from '../services/S3Service';

export const initializeContainer = (): Container => {
  const container = new Container();
  container.load(
    initializeOthersContainer(),
    initializeServicesContainer(),
    initializeRepositoriesContainer()
  );
  return container;
};

export const initializeServicesContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<UserService>(TYPES.UserService).to(UserService);
  bind<CustomerService>(TYPES.CustomerService).to(CustomerService);
  bind<S3Service>(TYPES.S3Service).to(S3Service);
});

const initializeRepositoriesContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  bind<CustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
});

export const initializeOthersContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<Authentication>(TYPES.Authentication).to(Authentication);
  bind<OnlyAdmin>(TYPES.OnlyAdmin).to(OnlyAdmin);
});
