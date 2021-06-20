import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import './controllers/UserController';
import { UserService } from "./services/UserService";
import { TYPES } from "./constants/types";

let container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000, () => {
  console.log('Running on port 3000!');
});
