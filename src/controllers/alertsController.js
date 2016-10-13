// const sendTextMessage = require('../utils/sendTextMessage');
const User = require('../models/user');
const Alert = require('../models/alerts');
const sendAlert = (location, alert) => {
  console.error(location);
  return User.find({
    location: {
      '$near': {
        $geometry: { type: 'Point', coordinates: location },
        $minDistance: 0,
        $maxDistance: 5000,
      },
    },
    available: true,
    responding: false,
  });
};

exports.createAlert = (req, res) => {
  const alertData = {
    name: req.body.name,
    location: [req.body.long, req.body.lat],
    geocoded: req.body.geocoded,
    phoneNumber: req.body.phoneNumber,
    resolved: false,
  };
  let result;
  Alert.create(alertData)
  .then((doc) => {
    result = doc;
    return sendAlert(doc.location, doc);
  })
  .then((users) => {
    /**
     * this is where we would trigger our events to be sent out 
    **/ 
    // console.error('users', users);
    res.json(result);
  })
  .catch((error) => {
    res.json({
      success: false,
      error,
    });
  });
};
