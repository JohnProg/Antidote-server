const User = require('../models/user');
exports.postLogin = (req, res) => {
  const data = {
    username: req.body.phoneNumber,
    password: req.body.code,
  };

  req.app.auth0.passwordless.signIn(data, (err, response) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
      });
    }

    const userData = {
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      licensePlate: req.body.licensePlate,
      car: {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
      },
      available: req.body.available,
      responding: false,
    };
    return User.create(userData)
    .then((user) => {
      res.json({
        success: true,
        access_token: response.access_token,
        user,
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        error,
      });
    });
  });
};
exports.logout = (req, res) => {

};
exports.postSignup = (req, res) => {
  const data = {
    phone_number: req.body.phoneNumber,
  };
  req.app.auth0.passwordless.sendSMS(data, (err) => {
    if (err) {
      console.log(err);
    }
    res.json({
      success: true,
    });
  });
};

// exports.updateUser = (req, res) => {
//   const access_token = req.body.access_token;
//   req.app.auth0.users.getInfo(access_token, function(result) {
//     res.json(result);
//   });
// };

exports.getUser = (req, res) => {
  const accessToken = req.query.access_token;
  req.app.auth0.users.getInfo(accessToken)
  .then((result) => {
    const parsed = JSON.parse(result);
    User.findOne({
      phoneNumber: parsed.phone_number
    }, function(err, doc) {
      if (err) {
        return res.json({
          success: false, 
          err,
        });
      }
      res.json(doc);
    });
  });
};
