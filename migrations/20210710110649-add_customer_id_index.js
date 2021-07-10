module.exports = {
  async up(db) {
    db.collection('customers').createIndex({ id: 1 }, { name: 'idx_customer_id' });
  },

  async down(db) {
    db.collection('customers').dropIndex('idx_customer_id');
  }
};
