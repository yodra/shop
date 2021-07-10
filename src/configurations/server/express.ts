import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Config } from '../Config';
import '../../controllers/UserController';
import '../../controllers/CustomerController';
import { ClientException } from '../../exceptions/ClientException';
import cookieParser from 'cookie-parser';


const errorHandler = (error: Error, _, response, next) => {
  if (error) {
    if (error instanceof ClientException) {
      response.status(error.httpCode).json({ error: error.message });
      return;
    }
    response.status(500).json('Something was broke!');
    return;
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
    app.use(cookieParser());
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
