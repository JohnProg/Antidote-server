const User = require('../models/user');
exports.postLogin = (req, res, next) => {

};
exports.logout = (req, res) => {

};
exports.postSignup = (req, res, next) => {
  const body = req.body;
  if (body.email) {
    // check if email exists
  }
  const user = new User({
    email: body.email,
    password: body.password,
    phoneNumber: body.phoneNumber,
    role: body.role,
    alertAreas: body.zipCode,
  });
  user.save((err) => {
    if (err) { return next(err); }
    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      res.json({
        data: user,
        success: true,
      });
    });
  });
};

/*
db.zip_codes.find({
    loc:
       { "$near" :
          {
            $geometry: { type: "Point",  coordinates: [ -71.0887750,42.3730050 ] },
            $minDistance: 0,
            $maxDistance: 1609.34
          }
       }})
       */
