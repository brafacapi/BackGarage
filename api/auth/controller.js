const bcrypt = require('../../helpers/bcrypt');
const tokenizer = require('../../helpers/tokenizer');

const { authValidatorHasErrors } = require('./helpers');
const Employee = require('../../database/models/User');

async function login(req, res) {
  const { email, password } = req.body;
  const errors = authValidatorHasErrors(req.body);
  if (errors) return res.json(errors);
  const data = await Employee.findOne({ email, deleted: false, active: true });
  const coincidence = data && (await bcrypt.compare(password, data.password));
  if (!coincidence) {
    return res.json({ error: { message: 'Email or password is wrong' } });
  }

  delete data._doc.password;
  const response = tokenizer.tokens(data._doc);
  return res.json(response);
}

async function refreshTokens(req, res) {
  const { refreshToken, user } = req.body;
  const token = tokenizer.decrypt(refreshToken);
  if (!token || token.data._id !== user) {
    return res.json({ error: { message: 'Refresh token is invalid' } });
  }

  const response = tokenizer.tokens(token.data);
  return res.json(response);
}

async function me(req, res) {
  return res.json({ data: { user: req.user } });
}

module.exports = {
  login,
  refreshTokens,
  me,
};
