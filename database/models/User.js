const mongoose = require('mongoose');
const bcrypt = require('../../helpers/bcrypt');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  deleted: {
    default: false,
    type: Boolean,
  },
  active: {
    default: true,
    type: Boolean,
  },
});

userSchema.post('save', async (doc, next) => {
  if (!doc.__v) {
    doc.password = await bcrypt.crypt(doc.password);
    doc.deleted = false;
    doc.active = true;
    doc.__v = 1;
    doc.save();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
