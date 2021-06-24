import 'reflect-metadata';
import './controllers/UserController';
import { server } from './server/express';
import dotenv from 'dotenv';
import { Config } from './Config';


const app = server.build();

dotenv.config();
app.listen(Config.port, () => {
  console.log(`Running on port ${Config.port}!`);
});
