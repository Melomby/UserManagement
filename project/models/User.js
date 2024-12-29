const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  UserID: Number,
  Name: String,
  Passport_no: String,
  Gender: String,
  BirthDate: Date,
  Hashed_password: String
});
module.exports = mongoose.model('User', UserSchema);
