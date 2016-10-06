const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, trim: true, index: true, unique: true, sparse: true },
  name: { type: String, default: '' },
  location: {
    lat: Number,
    long: Number,
  },
  licensePlate: { type: String, default: '' },
  car: {
    make: { type: String, default: '' },
    model: { type: String, default: '' },
    color: { type: String, default: '' },
  },
  available: Boolean,
  responding: Boolean,
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
