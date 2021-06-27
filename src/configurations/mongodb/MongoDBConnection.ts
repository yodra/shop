import { Config } from '../Config';
import { Db, MongoClient } from 'mongodb';

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static getConnection(result: (connection) => void) {
    if (this.isConnected) {
      return result(this.db);
    }

    this.connect(() => result(this.db));
  }

  private static connect(result: (error, db: Db) => void) {
    const { host, port, name, poolSize } = Config.dataBase;
    const configParameters = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      poolSize
    };

    const url = `mongodb://${host}:${port}/${name}`;
    MongoClient.connect(url, configParameters, (error, client) => {
      this.db = client.db(name);
      this.isConnected = true;
      return result(error, this.db);
    });
  }
}

export const initializeMongoDb = async () => {
  await new Promise<void>(resolve =>
    MongoDBConnection.getConnection(() =>
      resolve()));
  console.log('MongoDB Connected!');
};
