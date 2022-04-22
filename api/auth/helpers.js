const validator = require('../../helpers/validator');

module.exports = {
  authValidatorHasErrors(body) {
    if (!validator.emailValidator(body.email)) {
      return { error: { message: 'Email is required' } };
    }

    if (!body.password) {
      return { error: { message: 'Password is required' } };
    }

    return false;
  },
};
