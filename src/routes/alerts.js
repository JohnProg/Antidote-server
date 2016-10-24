const express = require('express');
const controller = require('../controllers/alertsController');
const router = express.Router();

module.exports = () => {
  router.route('/').post(controller.createAlert);
  router.route('/geocode').post(controller.geocode);
  return router;
};