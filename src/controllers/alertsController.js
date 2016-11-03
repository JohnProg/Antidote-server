// const sendTextMessage = require('../utils/sendTextMessage');
const User = require('../models/user');
const Alert = require('../models/alerts');
const config = require('../../config');
const geocoder = require('geocoder');
const sendAlert = require('../utils/sendAlert')
const getAvailableUsers = (location) => {
  return User.find({
    location: {
      '$near': {
        '$geometry': { type: 'Point', coordinates: location },
        '$minDistance': 0,
        '$maxDistance': 50000,
      },
    },
    available: true,
    responding: false,
  });
};

exports.createAlert = (req, res) => {
  const alertData = {
    name: req.body.name,
    location: [ req.body.lat, req.body.long],
    geocoded: req.body.geocoded,
    phoneNumber: req.body.phoneNumber,
    resolved: false,
  };
  let result;
  Alert.create(alertData)
  .then((doc) => {
    result = doc.toJSON();
    return getAvailableUsers(result.location);
  })
  .then((users) => {
    if (users.length === 0) {
      result = 'no users found'
      return true;
    }
    /**
     * this is where we would trigger our events to be sent out
    **/
    result.users = users;
    const promises = users.map((user) => {
      return sendAlert(user, result);
    });
    return Promise.all(promises);
  })
  .then(() => {
    res.json({
      success: true,
      result,
    });
  })
  .catch((error) => {
    res.json({
      success: false,
      error,
    });
  });
};


exports.geocode = (req, res) => {
  const apiKey = {
    apiKey: config.GOOGLE_MAPS_API_KEY,
  };

  geocoder.reverseGeocode(req.body.lat, req.body.long, (error, data) => {
    if (error) {
      return res.status(400).json({ error, success: false });
    }
    if (data && data.results && data.results[0] && data.results[0].formatted_address) {
      return res.json({
        success: true,
        address: data.results[0].formatted_address,
      });
    }

    return res.status(404).json({
      success: false,
      address: 'none',
    });
  }, apiKey);
};
