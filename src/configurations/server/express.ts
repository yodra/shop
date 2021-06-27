import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import '../../controllers/UserController';
import { Container } from 'inversify';
import { Config } from '../Config';

export const configureServer = (container: Container) => {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
  });

  return server;
};

export const initializeServer = (container: Container) =>
  new Promise(resolve => {
    const server = configureServer(container);
    const app = server.build();
    app.listen(Config.port, () =>
      resolve(`Running on port ${Config.port}!`));
  });

