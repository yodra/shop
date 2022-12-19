import { UserRepository } from '../UserRepository';
import { initializeMongoDb } from '../../configurations/mongodb/MongoDBConnection';

describe.only('UserRepository', () => {

  beforeAll(async () => {
    await initializeMongoDb();
  });

  it('should insert user', async () => {
    const repository = new UserRepository();

    await repository.insertOne({ name: 'Paca' });
    const users = await repository.findAll();

    expect(users).toBe([]);
  });
});
