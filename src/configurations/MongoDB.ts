import { Config } from './Config';
import { MongoClient } from 'mongodb';

export const connect = async () => {
  const { host, port, name, poolSize } = Config.dataBase;
  const url = `mongodb://${host}:${port}/${name}`;
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    poolSize
  });

  await client.connect();
  console.log('MongoDB connected!');
};
