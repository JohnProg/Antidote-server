const express = require('express');
const controller = require('../controllers/alertsController');
const router = express.Router();

module.exports = () => {
  router.route('/').post(controller.createAlert);
  router.route('/:id').get(controller.getAlert);
  router.route('/:id').post(controller.updateAlert);
  router.route('/:id').put(controller.updateAlert);
  router.route('/geocode').post(controller.geocode);
  return router;
};