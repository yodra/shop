import { configureServer } from '../../src/configurations/server/express';
import { Container, ContainerModule, interfaces } from 'inversify';
import { initializeServicesContainer } from '../../src/configurations/ioc';
import { UserRepository } from '../../src/repositories/UserRepository';
import { TYPES } from '../../src/constants/types';
import { CustomerRepository } from '../../src/repositories/CustomerRepository';

export const getTestServer = async (container: Container) => {
  const server = configureServer(container);
  return server.build();
};

export const initializeTestContainer = (): Container => {
  const container = new Container();
  container.load(
    initializeServicesContainer(),
    initializeRepositoriesTestContainer()
  );
  return container;
};

const initializeRepositoriesTestContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository).toConstantValue({} as any);
  bind<CustomerRepository>(TYPES.CustomerRepository).toConstantValue({} as any);
});
