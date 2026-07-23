const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const app = express();

let cacheLeyes = null;

app.get('/api/leyes', async (req, res) => {
  try {

    if (cacheLeyes) {
      return res.json(cacheLeyes);
    }

    const urlFuente =
      'https://www.diputados.gob.mx/LeyesBiblio/index.htm';

    const response = await fetch(urlFuente);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = Buffer.from(
      await response.arrayBuffer()
    );

    const html = new TextDecoder(
      'iso-8859-1'
    ).decode(buffer);

    const $ = cheerio.load(html);

    const lista = [];

    const rows = $('table tr').toArray();

    for (const row of rows) {
      const cols = $(row).find('td');

      if (cols.length < 2) continue;

      const enlace = $(row)
        .find('a[href*="ref/"]')
        .first();

      if (!enlace.length) continue;

      const nombre = enlace.text().trim();

      const rawHref =
        enlace.attr('href') || '';

      const ref = rawHref.startsWith('http')
        ? rawHref
        : `https://www.diputados.gob.mx/LeyesBiblio/${rawHref}`;

      const fechaReforma =
        $(cols[2]).text().trim() ||
        'No disponible';

      lista.push({
        nombre,
        fechaReforma,
        ref,
      });
    }

    cacheLeyes = lista;

    res.json(lista);

  } catch (error) {
    console.error(
      'Error al cargar leyes:',
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get('/api/pdf', async (req, res) => {
  try {
    const ref = req.query.ref;

    if (!ref) {
      return res.status(400).json({
        error: 'Falta parámetro ref'
      });
    }

    const response = await fetch(ref);

    const html = await response.text();

    const $ = cheerio.load(html);

    const pdfHref = $('a[href$=".pdf"]')
      .first()
      .attr('href');

    if (!pdfHref) {
      return res.status(404).json({
        error: 'PDF no encontrado'
      });
    }

    const pdf =
      `https://www.diputados.gob.mx/LeyesBiblio/${pdfHref.replace('../', '')}`;

    res.json({
      pdf
    });

  } catch (error) {
    console.error('Error obteniendo PDF:', error);

    res.status(500).json({
      error: error.message
    });
  }
});

console.log('SERVER LEYES CORRECTO');

app.listen(3001, '0.0.0.0', () => {
  console.log(
    'Servidor corriendo en puerto 3001'
  );
});