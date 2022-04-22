/* eslint-disable no-useless-escape */
module.exports = {
  emailValidator(string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string);
  },

  objectIdValidator(string) {
    return /^[0-9a-fA-F]{24}$/.test(string);
  },
};
