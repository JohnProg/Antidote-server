let config = require('../../config');
let client = require('twilio')(config.twilioSID, config.twilioToken);

module.exports = function (to, message) {
  client.messages.create({
    body: message,
    to,
    from: config.twilioNumber,
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function (err, data) {
    if (err) {
      console.error('Could not notify administrator');
      console.error(err);
    } else {
      console.log('Administrator notified');
    }
  });
};
