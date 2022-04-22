const bcrypt = require('bcryptjs');

module.exports = {
  crypt(value) {
    return new Promise((resolve) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return resolve(null);

        bcrypt.hash(value, salt, (error, hash) => {
          if (error) return resolve(null);
          return resolve(hash);
        });
      });
    });
  },

  compare(plainValue, hashValue) {
    return new Promise((resolve) => {
      bcrypt.compare(plainValue, hashValue, (err, isPasswordMatch) => {
        if (err) return resolve(false);
        return resolve(isPasswordMatch);
      });
    });
  },
};
