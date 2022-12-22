import { UserRepository } from '../UserRepository';
import { initializeMongoDb } from '../../configurations/mongodb/MongoDBConnection';

describe('UserRepository', () => {

  beforeAll(async () => {
    await initializeMongoDb();
  });

  it('should insert user', async () => {
    const repository = new UserRepository();

    await repository.insert({ name: 'Paca' });
    const users = await repository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name).toEqual('Paca');
  });

  it('should update user', async () => {
    const repository = new UserRepository();

    const user = await repository.findOne({ name: 'Paca' });

    await repository.update(user!._id, { name: 'Ms. Paca' });
    const users = await repository.findAll();

    expect(users.length).toEqual(1);
    expect(users[0].name).toEqual('Ms. Paca');
  });

  it('should delete user', async () => {
    const repository = new UserRepository();
    const user = await repository.findOne({ name: 'Paca' });

    await repository.delete(user!._id);
    const users = await repository.findAll();

    expect(users.length).toEqual(0);
  });
});
