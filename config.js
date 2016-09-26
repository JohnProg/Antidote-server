const config = {
   port: process.env.PORT || 9002,
   db: process.env.MONGO_HOST || 'mongodb://localhost/naloxone_app',
   env: process.env.ENV || 'development',
}

module.exports = config;