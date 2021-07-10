import 'reflect-metadata';
import { initializeMongoDb } from './configurations/mongodb/MongoDBConnection';
import { initializeServer } from './configurations/server/express';
import { initializeContainer } from './configurations/ioc';

const runApplication = async () => {
  await initializeMongoDb();
  const container = initializeContainer();
  return await initializeServer(container);
};

runApplication()
  .then(console.log)
  .catch(console.error);
