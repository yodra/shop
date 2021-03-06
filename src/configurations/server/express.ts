import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Config } from '../Config';
import '../../controllers/UserController';
import '../../controllers/CustomerController';
import { ClientException } from '../../exceptions/ClientException';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import morgan from 'morgan';

const errorHandler = (error: Error, _, response, next) => {
  if (error) {
    if (error instanceof ClientException) {
      response.status(error.httpCode).json({ error: error.message });
      return;
    }
    console.error(error);
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
    app.use(helmet());
    if (Config.logs.enabled) {
      app.use(morgan('tiny'));
    }
    app.use(cookieParser());
    app.use(fileUpload({
      limits: { fileSize: 10 * 1024 * 1024 },
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }));
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
