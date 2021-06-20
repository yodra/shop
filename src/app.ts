import 'reflect-metadata';
import './controllers/UserController';
import { server } from "./server/express";

const app = server.build();
app.listen(3000, () => {
  console.log('Running on port 3000!');
});
