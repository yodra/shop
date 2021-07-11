module.exports = {
  async up(db) {
    const userCreator = await db.collection('users').findOne({});
    if (!userCreator) {
      throw new Error('Not found a user to assign to customers');
    }

    await db.collection('customers').updateMany(
      { createdBy: { $exists: false } },
      { $set: { createdBy: userCreator._id } }
    );
  },

  async down() {
    // This migration has not need to do a down
  }
};
