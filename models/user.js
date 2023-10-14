const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6; // 6 is a reasonable value

const userSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true, // removes white space
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // in case want to reward user every year
  toJSON: { // automatically delete when the document is serialized
    transform: function(doc, ret) { // ret is return
      delete ret.password;
      return ret; // return document that was modified
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' key is the user document.  Can't use arrow function here
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash instead
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema)