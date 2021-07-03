module.exports = {
  async up(db) {
    await db.collection('customers').insertOne(
      {
        name: 'Juan',
        lastName: 'Barreño',
        image: 'https://via.placeholder.com/150'
      }
    );
  },

  async down(db) {
    await db.collection('customers').findOneAndDelete(
      {
        name: 'Juan',
        lastName: 'Barreño',
        image: 'https://via.placeholder.com/150'
      }
    );
  }
};
