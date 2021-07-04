import { injectable, unmanaged } from 'inversify';
import { Db, ObjectId } from 'mongodb';
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

  find(filter: Object): Promise<T[]> {
    // TODO: filter by not deletedAt
    return this.getCollection().find(filter).toArray();
  }

  findOne(filter: Object): Promise<T> {
    // TODO: filter by not deletedAt
    return this.getCollection().findOne(filter);
  }

  async insertOne(document: Partial<T>) {
    // TODO: add createdAt, updatedAt
    const result = await this.getCollection().insertOne(document);
    return result.ops[0];
  }

  async deleteOne(id: string) {
    await this.getCollection().findOneAndUpdate({ _id: new ObjectId(id) }, {
      $set: {
        updatedAt: new Date(),
        deletedAt: new Date()
      }
    });
  }
}
