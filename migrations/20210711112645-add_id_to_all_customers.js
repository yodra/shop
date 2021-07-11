module.exports = {
  async up(db) {
    db.collection('customers').find({ id: { $exists: false } })
      .forEach(customer => {
        db.collection('customers').updateOne(
          { _id: customer._id },
          { $set: { id: 'xxx' + Math.random() } });
      });
  },

  async down(db) {
    db.collection('customers').updateMany(
      { id: { $regex: '^xxx' } },
      { $unset: { id: 1 } }
    );
  }
};
