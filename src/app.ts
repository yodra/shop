import 'reflect-metadata';
import './controllers/UserController';
import { server } from './server/express';
import { Config } from './configurations/Config';
import { connect as mongoConnect } from './configurations/MongoDB';

const app = server.build();

const appListen = () =>
  new Promise(resolve =>
    app.listen(Config.port, () =>
      resolve(`Running on port ${Config.port}!`)));

const runApplication = async () => {
  await mongoConnect();
  return await appListen();
};

runApplication()
  .then(console.log)
  .catch(console.error);
