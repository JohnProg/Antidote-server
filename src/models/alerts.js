const mongoose = require('mongoose');

const alertsSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  location: [Number],
  geocoded: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  resolved: Boolean,
  users: [mongoose.Schema.Types.Mixed],
}, { timestamps: true });


const Alert = mongoose.model('Alert', alertsSchema);

module.exports = Alert;
