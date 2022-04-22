const User = require('../models/User');

class UserSeeder {
  async run() {
    await new User({
      firstname: 'Santiago',
      lastname: 'Ruiz Espitia',
      username: 'sruiz',
      password: 'Abc.123',
      email: 'sanruiz1003@gmail.com',
      deleted: false,
      active: true,
    }).save();

    await new User({
      firstname: 'Brayan',
      lastname: 'Uniminuto',
      username: 'brafacapi',
      password: 'Abc.123',
      email: 'brafacapi@gmail.com',
      deleted: false,
      active: true,
    }).save();
  }
}

module.exports = UserSeeder;
