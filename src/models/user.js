const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, index: true, unique: true, sparse: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  phoneNumber: { type: String, trim: true, index: true, unique: true, sparse: true },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  middleName: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  alertAreas: [String],
}, { timestamps: true });


/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
