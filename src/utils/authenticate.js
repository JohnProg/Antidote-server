const User = require('../models/user');
module.exports = (req, res, next) => {
  const accessToken = req.query.accessToken;
  req.app.auth0.users.getInfo(accessToken)
  .then((result) => {
    const parsed = JSON.parse(result);
    User.findOne({
      phoneNumber: parsed.phone_number,
    }, (err, doc) => {
      if (err) {
        return res.json({
          success: false,
          err,
        });
      }
      req.user = doc;
      return next();
    });
  });
};
