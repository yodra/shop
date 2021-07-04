module.exports = {
  async up(db) {
    await db.collection('users').updateMany({}, { $rename: { 'surname': 'lastname' } });
    await db.collection('customers').updateMany({}, { $rename: { 'lastName': 'lastname' } });
  },

  async down(db) {
    await db.collection('users').updateMany({}, { $rename: { 'lastname': 'surname' } });
    await db.collection('customers').updateMany({}, { $rename: { 'lastname': 'lastName' } });
  }
};
