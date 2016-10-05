const User = require('../models/user');
exports.postLogin = (req, res) => {
  const data = {
    username: req.body.phoneNumber,
    password: req.body.code,
  };

  req.app.auth0.passwordless.signIn(data, (err) => {
    if (err) {
      console.log(err);
    }
    res.json({
      success: true,
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

