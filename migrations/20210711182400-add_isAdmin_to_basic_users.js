module.exports = {
  async up(db) {
    await db.collection('users').updateMany(
      { isAdmin: { $exists: false } },
      { $set: { isAdmin: false } }
    );
  },

  async down() {
    // This migration has not need to do a down
  }
};
