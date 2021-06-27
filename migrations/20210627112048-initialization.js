module.exports = {
  async up(db) {
    await db.collection('users').insertMany([
      {
        name: 'Maria',
        surname: 'López'
      },
      {
        name: 'Sara',
        surname: 'Gracia'
      }
    ]);
  },
  async down(db) {
    await db.collection('users').findOneAndDelete({
      name: 'Maria',
      surname: 'López'
    });
    await db.collection('users').findOneAndDelete({
      name: 'Sara',
      surname: 'Gracia'
    });
  }
};
