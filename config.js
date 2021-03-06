const config = {
  port: process.env.PORT || 9002,
  db: process.env.MONGO_HOST || 'mongodb://localhost/naloxone_app',
  env: process.env.ENV || 'development',
  twilioSID: process.env.TWILIO_SID || '',
  twilioToken: process.env.TWILIO_TOKEN || '',
  twilioNumber: process.env.TWILIO_NUMBER || '',
  sessionSecret: process.env.SESSION_SECRET || 'testing123',
  AUTH0_ACCOUNT: process.env.AUTH0_ACCOUNT || '',
  AUTH0_CLIENTID: process.env.AUTH0_CLIENTID || '',
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
};

module.exports = config;
