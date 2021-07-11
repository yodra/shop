module.exports = {
  async up(db) {
    await db.collection('users').updateMany({}, { $rename: { 'updatedAt': 'lastUpdatedAt' } });
    await db.collection('customers').updateMany({}, { $rename: { 'updatedAt': 'lastUpdatedAt' } });
  },

  async down(db) {
    await db.collection('users').updateMany({}, { $rename: { 'lastUpdatedAt': 'updatedAt' } });
    await db.collection('customers').updateMany({}, { $rename: { 'lastUpdatedAt': 'updatedAt' } });
  }
};
