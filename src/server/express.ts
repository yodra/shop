import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import '../controllers/UserController';
import { Container } from "inversify";
import { UserService } from "../services/UserService";
import { TYPES } from "../constants/types";
import { UserRepository } from "../repositories/UserRepository";

export let container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

export let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});
