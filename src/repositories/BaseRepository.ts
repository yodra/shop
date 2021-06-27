import { injectable, unmanaged } from 'inversify';
import { Db } from 'mongodb';
import { MongoDBConnection } from '../configurations/mongodb/MongoDBConnection';

@injectable()
export class BaseRepository<T> {
  public db?: Db;

  constructor(@unmanaged() private collectionName: string) {
    MongoDBConnection.getConnection(connection => {
      this.db = connection;
    });
  }

  private getCollection() {
    return this.db!.collection(this.collectionName);
  }

  public find(filter: Object): Promise<T[]> {
    return this.getCollection().find(filter).toArray();
  }
}
