import { configureServer } from '../../src/configurations/server/express';
import { Container } from 'inversify';

export const getTestServer = async (container: Container) => {
  const server = configureServer(container);
  return server.build();
};
