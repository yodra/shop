import { configureServer } from '../../src/configurations/server/express';
import { initializeContainer } from '../../src/configurations/ioc';

export const getServer = async () => {
  const container = initializeContainer();
  //TODO inject mock repository
  const server = configureServer(container);
  return server.build();
};
