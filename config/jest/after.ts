import { configureServer } from '../../src/configurations/server/express';
import { Container, ContainerModule, interfaces } from 'inversify';
import { initializeOthersContainer, initializeServicesContainer } from '../../src/configurations/ioc';
import { UserRepository } from '../../src/repositories/UserRepository';
import { TYPES } from '../../src/constants/types';
import { CustomerRepository } from '../../src/repositories/CustomerRepository';
import { Config } from '../../src/configurations/Config';

export const userTokenMocked = [`${Config.jwt.cookieName}=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6IjU1MTEzN2MyZjllMWZhYzgwOGE1ZjU3MiJ9.YGP97EuZdlfOph-ft1-EnjFutbgs5P0dqlFY6H4sfCY`];
export const adminTokenMocked = [`${Config.jwt.cookieName}=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJhZG1pbiJdfQ.Mdvmj9rG2U1bDuN65rpF2bwNSf8CGhFy5I_3uSMUy3E`];

export const getTestServer = async (container: Container) => configureServer(container).build();

export const initializeTestContainer = (): Container => {
  const container = new Container();
  container.load(
    initializeOthersContainer(),
    initializeServicesContainer(),
    initializeRepositoriesTestContainer()
  );
  return container;
};

const initializeRepositoriesTestContainer = () => new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository).toConstantValue({} as any);
  bind<CustomerRepository>(TYPES.CustomerRepository).toConstantValue({} as any);
});
