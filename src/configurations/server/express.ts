import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Config } from '../Config';
import '../../controllers/UserController';
import '../../controllers/CustomerController';
import { ControllerClientException } from '../../controllers/exceptions/ControllerClientException';

const errorHandler = (error: Error, _, response, next) => {
  if (error) {
    if (error instanceof ControllerClientException) {
      response.status(400).json({ error: error.message });
    }
    return response.status(500).json('Something was broke!');
  }
  next();
};

export const configureServer = (container: Container) => {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
  });

  server.setErrorConfig((app) => {
    app.use(errorHandler);
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
