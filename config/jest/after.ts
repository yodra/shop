import { configureServer } from '../../src/configurations/server/express';
import { Container } from 'inversify';

export const getServer = async (container: Container) => {
  const server = configureServer(container);
  return server.build();
};
