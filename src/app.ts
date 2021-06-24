import 'reflect-metadata';
import './controllers/UserController';
import { server } from './server/express';
import { config } from 'dotenv';

config();

const app = server.build();
const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
