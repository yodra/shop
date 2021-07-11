module.exports = {
  async up(db) {
    await db.collection('customers').updateMany(
      { photo: 'https://via.placeholder.com/150' },
      { $set: { photo: 'customers/60eb336868db02408d4c3e74' } }
    );
  },

  async down() {
    // This migration has not need to do a down
  }
};
