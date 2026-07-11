const express = require('express');
const leyesController = require('./leyes.controller');

const router = express.Router();
router.get('/api/leyes', leyesController.getLeyes);

module.exports = router;
