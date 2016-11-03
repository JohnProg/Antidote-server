const config = require('../../config');
const client = require('twilio')(config.twilioSID, config.twilioToken);

module.exports = (user, alert) => {
  return new Promise((resolve, reject) => {
    client.messages.create({
      body: 'Someone needs your help',
      to: user.phoneNumber,
      from: config.twilioNumber,
      // mediaUrl: 'http://www.yourserver.com/someimage.png'
    }, function (err, data) {
      if (err) {
        console.error('Could not notify administrator');
        console.error(err);
        reject()
      } else {
        resolve()
      }
    });
  });
};