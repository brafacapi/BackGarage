require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
  connect() {
    const { DB_NAME, DB_PORT, DB_HOST } = process.env;
    if (!DB_HOST || !DB_PORT || !DB_NAME) {
      throw new Error('DB_NAME, DB_PORT, DB_HOST are required in .env file');
    }
    return mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    );
  },

  async dropDatabase() {
    await mongoose.connection.dropDatabase();
  },

  close() {
    return mongoose.connection.close();
  },
};
