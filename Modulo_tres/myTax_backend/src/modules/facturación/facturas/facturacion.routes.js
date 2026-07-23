const express = require('express');
const router = express.Router();

const facturacionService = require('./facturacion.service');

/* =========================
   EMISORES
========================= */

// Crear emisor
router.post('/emisores', (req, res) => {

  if (!req.body.nombre?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'El nombre es obligatorio'
    });
  }

  if (!req.body.rfc?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'El RFC es obligatorio'
    });
  }

  if (!req.body.regimenFiscal?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'El régimen fiscal es obligatorio'
    });
  }

  const emisor = {
    nombre: req.body.nombre,
    rfc: req.body.rfc,
    regimenFiscal: req.body.regimenFiscal,
  };

  const guardado =
    facturacionService.guardarEmisor(emisor);

  console.log('Emisor guardado:', guardado);

  res.json({
    success: true,
    data: guardado,
  });
});

// Obtener emisores
router.get('/emisores', (req, res) => {
  const emisores =
    facturacionService.obtenerEmisores();

  res.json(emisores);
});



router.get('/test', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'ruta funcionando'
  });
});

// Eliminar emisor
router.delete('/emisores/:nombre', (req, res) => {
  const eliminado =
    facturacionService.eliminarEmisor(
      req.params.nombre
    );

  res.json({
    success: true,
    data: eliminado,
  });
});

/* =========================
   RECEPTORES
========================= */

// Crear receptor
// Crear receptor
router.post('/receptores', (req, res) => {

  if (!req.body.nombre?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'El nombre es obligatorio'
    });
  }

  if (!req.body.rfc?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'El RFC es obligatorio'
    });
  }

  if (!req.body.regimenFiscal?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'El régimen fiscal es obligatorio'
    });
  }

  if (!req.body.codigoPostal?.trim()) {
  return res.status(400).json({
    success: false,
    error: 'El código postal es obligatorio'
  });
}

console.log('BODY RECIBIDO:', req.body);

const receptor = {
  nombre: req.body.nombre,
  rfc: req.body.rfc,
  regimenFiscal: req.body.regimenFiscal,
  codigoPostal: req.body.codigoPostal,
};

console.log('RECEPTOR GUARDADO:', receptor);

  const guardado =
    facturacionService.guardarReceptor(
      receptor
    );

  console.log('Receptor guardado:', guardado);

  res.json({
    success: true,
    data: guardado,
  });
});
// Obtener receptores
router.get('/receptores', (req, res) => {
  const receptores =
    facturacionService.obtenerReceptores();

  res.json(receptores);
});

// Eliminar receptor
router.delete('/receptores/:nombre', (req, res) => {
  const eliminado =
    facturacionService.eliminarReceptor(
      req.params.nombre
    );

  res.json({
    success: true,
    data: eliminado,
  });
});

module.exports = router;

console.log('FACTURACION ROUTES CARGADAS');