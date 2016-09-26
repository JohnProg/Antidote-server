const twilio = require('twilio')

module.exports = () => {
    var twiml = new twilio.TwimlResponse();
    twiml.say("Thank you for calling the ET Phone Home Service - the " +
        "adventurous alien's first choice in intergalactic travel");

    twiml.hangup();
    return twiml;
}