const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const zipCodeSchema = new mongoose.Schema({
  '_id': String,
  'city': String,
  'loc': [Number],
  'pop': Number,
  'state': String,
}, { collection: 'zip_codes' });


const ZipCode = mongoose.model('ZipCodes', zipCodeSchema);

module.exports = ZipCode;
