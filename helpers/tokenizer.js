const jwt = require('jsonwebtoken');

module.exports = {
  create(payload, expiresIn) {
    return jwt.sign(payload, String(process.env.TOKEN_KEY), { expiresIn });
  },

  decrypt(token) {
    try {
      return jwt.verify(String(token), String(process.env.TOKEN_KEY));
    } catch (e) {
      return false;
    }
  },

  tokens(data) {
    const expiresIn = Number(process.env.TOKEN_EXPIRATION) || 3600;
    const accessToken = this.create(data, expiresIn);
    const refreshToken = this.create({ data, accessToken }, expiresIn * 2);
    return { data, accessToken, refreshToken };
  },
};
