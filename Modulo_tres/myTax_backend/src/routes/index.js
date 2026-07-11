const express = require('express');
const leyesRoutes = require('../modules/leyes/leyes.routes');

const router = express.Router();
router.use(leyesRoutes);

module.exports = router;
