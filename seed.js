/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');

const database = require('./helpers/database');

async function exec() {
  const SEEDERS_PATH = path.join(__dirname, './database/seeders');
  const files = fs.readdirSync(SEEDERS_PATH);
  await database.connect();
  await database.dropDatabase();

  await Promise.all(
    files.map((file) => {
      if (file[0] !== '_') {
        const filePath = path.join(SEEDERS_PATH, file);
        const SeederClass = require(filePath);
        return new SeederClass().run();
      }

      return false;
    }),
  );

  database.close();
}

exec();
