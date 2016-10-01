// const sendTextMessage = require('../utils/sendTextMessage');
const ZipCode = require('../models/zipCodes');
const User = require('../models/user');
exports.sendAlert = (req, res) => {
  const result = ZipCode.find({
    loc: {
      '$near': {
        $geometry: { type: 'Point', coordinates: [-73.069836, 40.787868] },
        $minDistance: 0,
        $maxDistance: 5000,
      },
    },
  })
  .then(function (zipCodes) {
    const zipCodeResults = zipCodes.map((zip) => {
      return zip._id;
    });
    return User.find({ 'alertAreas': { '$elemMatch': { '$in': zipCodeResults } } });
  })
  .then(function (results) {
    res.json(results);
  });
  /* db.users*/
};
