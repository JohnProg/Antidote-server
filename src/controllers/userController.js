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
    return User.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, userData, { upsert: true })
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
      res.json({
        success: false,
        error: err,
      });
    }
    res.json({
      success: true,
    });
  });
};

exports.updateUser = (req, res) => {
  if (`+${req.params.id}` !== req.user.phoneNumber) {
    res.json({
      success: false,
      error: 'you are updating the wrong user',
    });
  }
  return User.findOneAndUpdate({ phoneNumber: req.user.phoneNumber }, req.body, { new: true, upsert: true })
    .then((user) => {
      res.json({
        success: true,
        user,
      });
    });
};

exports.getUser = (req, res) => {
  res.json(req.user);
};
