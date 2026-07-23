const express = require('express');
const leyesRoutes = require('../modules/leyes/leyes.routes');

const facturacionRoutes = require(
  '../modules/facturación/facturas/facturacion.routes'
);

const router = express.Router();

router.use(leyesRoutes);
router.use('/facturacion', facturacionRoutes);

module.exports = router;