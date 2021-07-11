module.exports = {
  async up(db) {
    await db.collection('customers').updateMany({}, { $rename: { 'image': 'photo' } });
  },

  async down(db) {
    await db.collection('customers').updateMany({}, { $rename: { 'photo': 'image' } });
  }
};
